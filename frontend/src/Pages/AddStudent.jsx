
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import {
  UserPlus,
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
} from "lucide-react";

const API = "https://student-management-backend-7mlc.onrender.com/api/students";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course: "",
  department: "",
};

function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEditing = Boolean(id);

  const location = useLocation();
const selectedStudent = location.state?.student;

  useEffect(() => {
  if (!isEditing) return;

  // Use the student details passed from the Students page.
  if (selectedStudent) {
    setForm({
      name: selectedStudent.name || "",
      email: selectedStudent.email || "",
      phone: selectedStudent.phone || "",
      course: selectedStudent.course || "",
      department: selectedStudent.department || "",
    });

    return;
  }

  // Fallback: fetch details if the edit page is opened directly.
  const fetchStudent = async () => {
    try {
      setFetching(true);

      const response = await axios.get(`${API}/${id}`);

      setForm({
        name: response.data.name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        course: response.data.course || "",
        department: response.data.department || "",
      });
    } catch (error) {
      console.error(error);
      setError("Unable to load student details.");
    } finally {
      setFetching(false);
    }
  };

  fetchStudent();
}, [id, isEditing, selectedStudent]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isEditing) {
        await axios.put(`${API}/${id}`, form);
        setMessage("Student details updated successfully.");
      } else {
        await axios.post(API, form);
        setMessage("Student registered successfully.");
      }

      setTimeout(() => {
        navigate("/students");
      }, 800);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="form-loading">Loading student details...</div>;
  }

  return (
    <div className="add-student-page">
      <div className="page-intro">
        <div>
          <p className="welcome-label">
            STUDENT MANAGEMENT / {isEditing ? "EDIT" : "REGISTRATION"}
          </p>
          <h1>{isEditing ? "Edit Student" : "Add New Student"}</h1>
          <p>
            {isEditing
              ? "Update the student's information below."
              : "Enter the student's details to create a new record."}
          </p>
        </div>

        <Link to="/students" className="back-button">
          <ArrowLeft size={17} />
          Back to Students
        </Link>
      </div>

      <section className="form-card">
        <div className="form-card-heading">
          <div className="form-heading-icon">
            {isEditing ? <User size={23} /> : <UserPlus size={23} />}
          </div>
          <div>
            <h2>Personal Information</h2>
            <p>Fill in all the required student details.</p>
          </div>
        </div>

        {error && <div className="form-alert error-alert">{error}</div>}
        {message && (
          <div className="form-alert success-alert">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <div className="form-input-wrapper">
                <User size={18} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter student's full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <div className="form-input-wrapper">
                <Mail size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <div className="form-input-wrapper">
                <Phone size={18} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="course">Course *</label>
              <div className="form-input-wrapper">
                <BookOpen size={18} />
                <input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="e.g. B.Tech"
                  value={form.course}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="department">Department *</label>
              <div className="form-input-wrapper">
                <Building2 size={18} />
                <input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <p>* All fields are required.</p>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/students")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                <Save size={17} />
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Student"
                  : "Save Student"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddStudent;
