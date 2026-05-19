import { useState, useEffect } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedProjectId = queryParams.get("projectId");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchTasks();
    fetchProjects();

    if (user?.role === "Admin") {
      fetchUsers();
    }
  }, [selectedProjectId]);

  const fetchTasks = async () => {
    const res = await api.get("/api/tasks");

    if (selectedProjectId) {
      const filtered = res.data.filter(
        t => t.ProjectId == selectedProjectId
      );
      setTasks(filtered);
    } else {
      setTasks(res.data);
    }
  };

  const fetchProjects = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/api/users");
    setUsers(res.data);
  };

  const createTask = async () => {
    try {
      if (!projectId && !selectedProjectId) {
        alert("Select a project");
        return;
      }

      await api.post("/api/tasks", {
        title,
        projectId: projectId || selectedProjectId,
        dueDate,
        assignedUserId
      });

      setTitle("");
      setProjectId("");
      setDueDate("");
      setAssignedUserId("");

      fetchTasks();
    } catch {
      alert("Error creating task");
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/api/tasks/${id}`, { status });
    fetchTasks();
  };

  const updateAssignment = async (id, assignedUserId) => {
    await api.put(`/api/tasks/${id}`, { assignedUserId });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Tasks</h2>

      {selectedProjectId && (
        <p className="mb-4 text-gray-600">
          Showing tasks for Project ID: {selectedProjectId}
        </p>
      )}

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2"
          placeholder="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {!selectedProjectId && (
          <select
            className="border p-2"
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        {user?.role === "Admin" && (
          <select
            className="border p-2"
            value={assignedUserId}
            onChange={e => setAssignedUserId(e.target.value)}
          >
            <option value="">Assign User</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="date"
          className="border p-2"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <button
          className="bg-green-500 text-white px-4"
          onClick={createTask}
        >
          Create
        </button>
      </div>

      <div className="grid gap-3">
        {tasks.map(t => (
          <div
            key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p>Project: {t.Project?.name}</p>
              <p>Status: {t.status}</p>

              <select
                className="border p-1 mt-2"
                value={t.status}
                onChange={e => updateStatus(t.id, e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              {user?.role === "Admin" && (
                <>
                  <select
                    className="border p-1 mt-2 ml-2"
                    value={t.assignedUserId || ""}
                    onChange={e =>
                      updateAssignment(t.id, e.target.value)
                    }
                  >
                    <option value="">Assign User</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="bg-red-500 text-white px-2 py-1 mt-2 ml-2"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Assigned</p>

              <p className="font-semibold">
                {t.User
                  ? t.User.name +
                    (t.User.id === user?.id ? " (You)" : "")
                  : "Unassigned"}
              </p>

              {/* Optional email display */}
              {t.User?.email && (
                <p className="text-xs text-gray-400">
                  {t.User.email}
                </p>
              )}

              <p className="text-sm mt-2 text-gray-500">Due</p>

              <p
                className={
                  t.dueDate &&
                  new Date(t.dueDate) < new Date() &&
                  t.status !== "Done"
                    ? "text-red-500 font-semibold"
                    : ""
                }
              >
                {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString()
                  : "No deadline"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}