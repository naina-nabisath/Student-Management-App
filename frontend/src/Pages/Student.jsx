
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Search,
    UserPlus,
    Pencil,
    Trash2,
    Users,
    GraduationCap,
} from "lucide-react";

const API = "http://localhost:8080/api/students";

function Students() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API);
            setStudents(response.data);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Unable to load students. Please check your backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const filteredStudents = students.filter((student) => {
        const searchText = search.toLowerCase();

        return (
            student.name?.toLowerCase().includes(searchText) ||
            student.email?.toLowerCase().includes(searchText) ||
            student.course?.toLowerCase().includes(searchText) ||
            student.department?.toLowerCase().includes(searchText)
        );
    });

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) return;

        try {
            await axios.delete(`${API}/${id}`);
            setStudents((previous) =>
                previous.filter((student) => student.id !== id)
            );
        } catch (error) {
            console.error(error);
            alert("Unable to delete student. Please try again.");
        }
    };

    return (
        <div className="students-page">
            <div className="page-intro">
                <div>
                    <p className="welcome-label">STUDENT DIRECTORY</p>
                    <h1>All Students</h1>
                    <p>View and manage all registered students.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => navigate("/students/add")}
                >
                    <UserPlus size={18} />
                    Add Student
                </button>
            </div>

            <div className="student-summary">
                <div className="summary-icon">
                    <Users size={23} />
                </div>
                <div>
                    <p>Total Registered Students</p>
                    <h2>{students.length}</h2>
                </div>
            </div>

            <section className="students-panel">
                <div className="students-toolbar">
                    <div>
                        <h2>Student Records</h2>
                        <p>{filteredStudents.length} student(s) found</p>
                    </div>

                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="students-empty">Loading students...</div>
                ) : error ? (
                    <div className="students-empty error-text">{error}</div>
                ) : filteredStudents.length === 0 ? (
                    <div className="students-empty">
                        <div className="empty-icon">
                            <GraduationCap size={30} />
                        </div>
                        <h3>{search ? "No matching students" : "No students yet"}</h3>
                        <p>
                            {search
                                ? "Try searching with a different name or keyword."
                                : "Add your first student to see their records here."}
                        </p>

                        {!search && (
                            <button
                                className="primary-button"
                                onClick={() => navigate("/students/add")}
                            >
                                <UserPlus size={17} />
                                Add Student
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="table-scroll">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>STUDENT</th>
                                    <th>PHONE</th>
                                    <th>COURSE</th>
                                    <th>DEPARTMENT</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <div className="student-name-cell">
                                                <div className="student-avatar">
                                                    {student.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <strong>{student.name}</strong>
                                                    <span>{student.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{student.phone || "—"}</td>
                                        <td>{student.course || "—"}</td>
                                        <td>
                                            <span className="department-tag">
                                                {student.department || "—"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-button edit-button"
                                                    title="Edit student"
                                                    onClick={() =>
                                                        navigate(`/students/edit/${student.id}`, {
                                                            state: { student },
                                                        })
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    className="action-button delete-button"
                                                    title="Delete student"
                                                    onClick={() => handleDelete(student.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Students;
