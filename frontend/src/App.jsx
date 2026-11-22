import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Student from "./Pages/Student";
import AddStudent from "./Pages/AddStudent";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Header />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Student />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/edit/:id" element={<AddStudent />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;