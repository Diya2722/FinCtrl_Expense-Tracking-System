import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/chartUtil";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h5 className="text-xl font-semibold text-gray-800">Expense Overview</h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track your spending trends over time and gain insights into where your money goes.
                    </p>
                </div>

                <button 
                    onClick={onAddExpense} 
                    className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-100 transition-all duration-150"
                    data-testid="add-expense-btn"
                >
                    <Plus size={16} /> Add Expense
                </button>
            </div>

            <div className="mt-8 h-80 w-full"> 
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
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
                            fill="url(#colorAmount)"
                            dot={{ r: 4, fill: '#8b5cf6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseOverview;