import { addThousandSeparator } from "../util/util";
import CustomPieChart from "../components/CustomPieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B', '#9013FE', '#8B572A'];

    const balanceData = [
        { name: 'Total Balance', value: totalBalance },
        { name: 'Total Income', value: totalIncome },
        { name: 'Total Expense', value: totalExpense }
    ];

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Finance Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />

        </div>
    )
}
export default FinanceOverview;
