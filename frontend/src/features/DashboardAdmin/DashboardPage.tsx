import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "./DashboardForm";
import type { Admin } from "../../types/adminType";
import type { UserInfo } from "../../types/userType";
import "../../styles/DashboardAdmin/DashboardPage.css";
import { getAllUsers, deleteUser, updateUserRole } from "../../api/userApi";

export default function DashboardPage() {
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const storedAdmin = localStorage.getItem("currentAdmin");
        return storedAdmin ? JSON.parse(storedAdmin) : null;
    });

    const navigate = useNavigate();
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>("");

    const handleLogoutAdmin = () => {
        localStorage.removeItem("currentAdmin");
        setAdmin(null);
        navigate("/LoginAdmin");
    };

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const handleDeleteUser = async (username: string) => {
        try {
            await deleteUser(username);
            alert(`User ${username} deleted successfully`);
            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleEditUserRoleButton = async (username: string, newRole: string) => {
        try {
            await updateUserRole(username, newRole);
            alert(`User ${username} role updated successfully`);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Failed to update user role:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboardHeader">
                <div className="admin-dashboardTitle">Manage Accounts</div>
                <DashboardForm admin={admin} onLogout={handleLogoutAdmin} />
            </div>

            <div className="admin-dashboardContainerManage">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {editingUser === user.username ? (
                                        <select
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.username ? (
                                        <>
                                            <button
                                                className="admin-dashboardUpdateUserRoleButton"
                                                onClick={() => handleEditUserRoleButton(user.username, selectedRole)}
                                            >
                                                Update
                                            </button>
                                            <button className= "admin-dashboardCancelButton" onClick={() => setEditingUser(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="admin-dashboardDeleteUserButton"
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
                                                        handleDeleteUser(user.username);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="admin-dashboardEditUserRoleButton"
                                                onClick={() => {
                                                    setEditingUser(user.username);
                                                    setSelectedRole(user.role);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
