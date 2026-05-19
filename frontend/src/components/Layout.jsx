import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const linkClass = (path) =>
    `p-2 rounded ${
      location.pathname === path
        ? "bg-gray-700"
        : "hover:bg-gray-800"
    }`;

  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 text-white p-5 fixed h-screen flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Team Task Manager</h2>

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/projects" className={linkClass("/projects")}>
            Projects
          </Link>

          <Link to="/tasks" className={linkClass("/tasks")}>
            Tasks
          </Link>
        </nav>

        <button
          className="mt-auto bg-red-500 w-full p-2 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="ml-64 flex-1 bg-gray-100 p-6 h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}