import { useState, useEffect } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/api/projects");
    setProjects(res.data);
  };

  const saveProject = async () => {
    try {
      if (!name.trim()) return alert("Name required");

      if (editId) {
        await api.put(`/api/projects/${editId}`, {
          name,
          description
        });
        setEditId(null);
      } else {
        await api.post("/api/projects", {
          name,
          description
        });
      }

      setName("");
      setDescription("");
      fetchProjects();
    } catch {
      alert("Only Admin can perform this action");
    }
  };

  const editProject = (e, p) => {
    e.stopPropagation();
    setEditId(p.id);
    setName(p.name);
    setDescription(p.description);
  };

  const deleteProject = async (e, id) => {
    e.stopPropagation();

    if (!confirm("Delete this project?")) return;

    await api.delete(`/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Projects</h2>

      {role === "Admin" && (
        <div className="flex gap-3 mb-6">
          <input
            className="border p-2"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button
            className="bg-green-500 text-white px-4"
            onClick={saveProject}
          >
            {editId ? "Update" : "Create"}
          </button>
        </div>
      )}

      <div className="grid gap-3">
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/tasks?projectId=${p.id}`)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.description}</p>
            </div>

            {role === "Admin" && (
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1"
                  onClick={(e) => editProject(e, p)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1"
                  onClick={(e) => deleteProject(e, p.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}