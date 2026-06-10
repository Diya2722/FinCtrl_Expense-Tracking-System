import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
            
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">{title}</h5>

                <button className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 transition" onClick={onMore}>
                    More <ArrowRight size={15} />
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    );
};

export default Transactions;