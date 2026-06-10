import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/chartUtil";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h5 className="text-xl font-semibold text-gray-800">Income Overview</h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>

                <button 
                    onClick={onAddIncome} 
                    className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-100 transition-all duration-150"
                    data-testid="add-income-btn"
                >
                    <Plus size={16} /> Add Income
                </button>
            </div>

            <div className="mt-8 h-80 w-full"> 
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="day" 
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="amount"
                            stroke="#8b5cf6" 
                            strokeWidth={3} 
                            fill="url(#colorIncome)"
                            dot={{ r: 4, fill: '#8b5cf6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeOverview;
