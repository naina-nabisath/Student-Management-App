
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
} from "lucide-react";

function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Students", path: "/students", icon: Users },
    { name: "Add Student", path: "/students/add", icon: UserPlus },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <GraduationCap size={25} />
        </div>
        <div>
          <h2>EduManage</h2>
          <p>Student Portal</p>
        </div>
      </div>

      <p className="menu-label">MAIN MENU</p>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-icon">
          <GraduationCap size={20} />
        </div>
        <div>
          <strong>Student Management</strong>
          <p>Manage your institution</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
