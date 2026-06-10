import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const RecentTransaction = ({ transactions, onMore }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800 ">
                    Recent Transactions
                </h4>

                <button
                    onClick={onMore}
                    className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
                >
                    More <ArrowRight size={16} />
                </button>
            </div>

            {/* Transactions List */}
            <div className="mt-5 space-y-4">
                {transactions?.slice(0, 5).map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.createdAt).format("DD MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    );
};

export default RecentTransaction;