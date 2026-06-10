import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";
import toast from "react-hot-toast";

const COLORS = ["#6B46C1", "#E53E3E"];

const Reports = () => {
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.ADMIN_REPORTS);
        setIncomeExpenseData(response.data.incomeExpenseData || []);
        setPieData(response.data.pieData || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load reports");
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomeExpenseData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Income" stroke="#6B46C1" strokeWidth={2} />
            <Line type="monotone" dataKey="Expense" stroke="#E53E3E" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Overall Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Reports;
