
import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/students": "Students",
    "/students/add": "Add Student",
  };

  const title = location.pathname.startsWith("/students/edit/")
    ? "Edit Student"
    : pageTitles[location.pathname] || "Student Management";

  return (
    <header className="top-header">
      <div>
        <p className="header-breadcrumb">Pages / {title}</p>
        <h2>{title}</h2>
      </div>

      <div className="header-actions">
        <button className="header-icon" aria-label="Search">
          <Search size={19} />
        </button>

        <button className="header-icon" aria-label="Notifications">
          <Bell size={19} />
        </button>

        <div className="profile">
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
