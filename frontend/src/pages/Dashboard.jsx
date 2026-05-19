import { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: []
  });

  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/api/tasks/dashboard")
      .then(res => setData(res.data));

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/api/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await api.delete(`/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-600 text-lg">
          Role:{" "}
          <span
            className={`font-semibold ${
              role === "Admin" ? "text-green-600" : "text-blue-600"
            }`}
          >
            {role}
          </span>
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Tasks</h3>
          <p className="text-3xl font-bold">{data.total}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Completed</h3>
          <p className="text-3xl text-green-600 font-bold">
            {data.completed}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Pending</h3>
          <p className="text-3xl text-red-500 font-bold">
            {data.pending}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Overdue</h3>
          <p className="text-3xl text-orange-500 font-bold">
            {data.overdue?.length || 0}
          </p>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {role === "Admin" ? "Users" : "Admin Contacts"}
        </h2>

        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>

              {role === "Admin" && (
                <th className="p-3 border">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 text-center">
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.role}</td>

                {role === "Admin" && (
                  <td className="p-3 border">
                    <div className="flex justify-center">
                      {u.role !== "Admin" && (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}