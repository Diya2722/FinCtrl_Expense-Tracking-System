import { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        users: 0,
        transactions: 0,
        systemUsage: 0
    });

    useEffect(() => {
        const fetchDashboardOverview = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.ADMIN_DASHBOARD);
                setDashboardData({
                    users: response.data.users || 0,
                    transactions: response.data.transactions || 0,
                    systemUsage: response.data.systemUsage || 0
                });
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to load dashboard overview");
            }
        };

        fetchDashboardOverview();
    }, []);

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Total Users</p>
                    <h3 className="text-xl font-semibold mt-2">{dashboardData.users}</h3>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <h3 className="text-xl font-semibold mt-2">{dashboardData.transactions}</h3>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">System Usage</p>
                    <h3 className="text-xl font-semibold mt-2">{dashboardData.systemUsage}%</h3>
                </div>

            </div>
        </>
    );
};

export default AdminDashboard;
