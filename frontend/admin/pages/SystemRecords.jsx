import { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";
import toast from "react-hot-toast";

const SystemRecords = () => {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.ADMIN_SYSTEM_RECORDS);
                setRecords(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to load system records");
            }
        };

        fetchRecords();
    }, []);

    return (
        <>
            <h2 className="text-xl font-bold mb-4">System Records</h2>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                {records ? (
                    <div className="space-y-2 text-gray-700">
                        <p>Total Users: {records.users}</p>
                        <p>Total Transactions: {records.transactions}</p>
                        <p>Server Status: {records.status}</p>
                        <p>Server Time: {new Date(records.serverTime).toLocaleString()}</p>
                    </div>
                ) : (
                    <p className="text-gray-600">
                        Loading system records...
                    </p>
                )}

            </div>
        </>
    );
};

export default SystemRecords;
