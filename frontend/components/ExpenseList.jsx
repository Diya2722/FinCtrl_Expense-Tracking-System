import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({transactions, onDelete, onEdit, onDownload, onEmail}) => {
    const [loading, setLoading] = useState(false);

    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
        
                <h5 className="text-md font-semibold text-gray-700">
                    All Expenses
                </h5>

                <div className="flex items-center gap-2">
                    
                    {/* <button disabled={loading} onClick={handleEmail} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={14} className="text-base"/> Email
                            </>
                        )}
                    </button> */}

                    <button disabled={loading} onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={14} /> Download
                            </>
                        )}
                    </button>

                </div>
            </div>  
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense) => (

                        <TransactionInfoCard
                            key={expense.id}
                            title={expense.name}
                            icon={expense.icon}
                            date={moment(expense.date).format('DD MMM YYYY')}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense.id)}
                            onEdit={() => onEdit(expense)}
                        />

                ))}

            </div>

        </div>
    )
}
export default ExpenseList;
