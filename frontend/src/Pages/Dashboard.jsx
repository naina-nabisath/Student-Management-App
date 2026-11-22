
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Building2,
  UserPlus,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const API = "https://student-management-backend-7mlc.onrender.com/api/students";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course).filter(Boolean)
  ).size;

  const totalDepartments = new Set(
    students.map((student) => student.department).filter(Boolean)
  ).size;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "#FB923C",
      description: "Registered students",
    },
    {
      title: "Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "#0D9488",
      description: "Different courses",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: Building2,
      color: "#6366F1",
      description: "Active departments",
    },
  ];

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="welcome-label">OVERVIEW</p>
          <h1>Welcome to EduManage</h1>
          <p>
            Manage your students, courses, and departments from one place.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/students/add")}
        >
          <UserPlus size={18} />
          Add New Student
        </button>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-top">
                <div
                  className="stat-icon"
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <Icon size={23} />
                </div>
                <span className="stat-indicator">Overview</span>
              </div>

              <h2>{loading ? "..." : stat.value}</h2>
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </div>
          );
        })}
      </section>

      <section className="dashboard-content">
        <div className="section-heading">
          <div>
            <h2>Recent Students</h2>
            <p>Latest registered students</p>
          </div>

          <Link to="/students" className="view-all-link">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="recent-table-wrapper">
          {loading ? (
            <p className="dashboard-message">Loading students...</p>
          ) : students.length === 0 ? (
            <div className="empty-dashboard">
              <div className="empty-icon">
                <GraduationCap size={30} />
              </div>
              <h3>No students registered yet</h3>
              <p>Add your first student to get started.</p>
              <button
                className="primary-button"
                onClick={() => navigate("/students/add")}
              >
                <UserPlus size={17} />
                Add Student
              </button>
            </div>
          ) : (
            <div className="table-scroll">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>PHONE</th>
                    <th>COURSE</th>
                    <th>DEPARTMENT</th>
                  </tr>
                </thead>

                <tbody>
                  {students.slice(-5).reverse().map((student) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
