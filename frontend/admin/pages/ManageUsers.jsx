import { useEffect, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.ADMIN_USERS);
            setUsers(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditForm({ name: user.name, email: user.email });
        setEditingUser(user);
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            await axiosConfig.put(API_ENDPOINTS.ADMIN_USER_BY_ID(editingUser.id), editForm);
            toast.success("User updated successfully");
            setShowModal(false);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this user?')) {
            try {
                await axiosConfig.delete(API_ENDPOINTS.ADMIN_USER_BY_ID(id));
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete user");
            }
        }
    };

    return (
        <div className="p-6">
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Manage Users
            </h2>

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        
                        {/* Header */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                                <th className="text-left p-4 font-semibold text-gray-600">Email</th>
                                <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                                    
                                    <td className="p-4 font-medium text-gray-800">
                                        {user.name}
                                    </td>

                                    <td className="p-4 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="p-4 flex gap-2">
                                        
                                        {/* Edit */}
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                        >
                                            <Edit3 size={16} />
                                            Edit
                                        </button>

                                        {/* Delete */}
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    
                    <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6">
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Edit User
                        </h3>

                        <div className="space-y-4">

                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />

                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                placeholder="Email Address"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />

                            <div className="flex gap-3 pt-2">
                                
                                <button
                                    onClick={handleSaveEdit}
                                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageUsers;
