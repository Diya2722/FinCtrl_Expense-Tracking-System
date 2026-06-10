import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment/moment";
import { isMoment } from "moment/moment";
import { useState } from "react";

const IncomeList = ({transactions, onDelete, onEdit, onDownload, onEmail}) => {
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
            <div className="flex items-center justify-between">
        
                <h5 className="text-md font-semibold text-gray-700">
                    Income Sources
                </h5>

                <div className="flex items-center gap-2">
                    
                    {/* <button disabled={loading} onClick={handleEmail} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 transition">
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animated-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={14} className="text-base"/> Email
                            </>
                        )}
                    </button> */}

                    <button disabled={loading} onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 transition">
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animated-spin"/>
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
                {/* display incomes */}
                {transactions?.map((income) => (

                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format('DD MMM YYYY')}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                            onEdit={() => onEdit(income)}
                        />

                ))}

            </div>

        </div>
    )
}
export default IncomeList;