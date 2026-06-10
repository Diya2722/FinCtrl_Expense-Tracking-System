import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DEFAULT_COLORS = ["#7c3aed", "#22c55e", "#ef4444", "#f59e0b"];

const CustomPieChart = ({
    data = [],
    colors = DEFAULT_COLORS,
    label = "",
    totalAmount = "",
    showTextAnchor = false
}) => {
    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={82}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>

                    {showTextAnchor ? (
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan x="50%" dy="-0.6em" className="fill-gray-500 text-[12px]">
                                {label}
                            </tspan>
                            <tspan x="50%" dy="1.6em" className="fill-gray-900 text-[16px] font-semibold">
                                {totalAmount}
                            </tspan>
                        </text>
                    ) : null}

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
