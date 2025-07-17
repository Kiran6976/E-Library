import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const updateRole = async (id, newRole) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/users/${id}/role`, { role: newRole }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== 'admin' ? (
                  <button onClick={() => updateRole(u._id, 'admin')}>Promote</button>
                ) : (
                  <button onClick={() => updateRole(u._id, 'student')}>Demote</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
