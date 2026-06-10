import { Trash2, Edit3, TrendingUp, UtensilsCrossed } from "lucide-react";


const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () => type === "income" ? 'text-green-50 bg-green-800' : 'bg-red-50 text-red-800';

    return (
        // <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
        //     <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        //         {icon ? (
        //             <img src={icon} alt={title} className="w-6 h-6" />
        //         ) :(
        //                 <UtensilsCrossed size={22} className="text-purple-600" />
        //         )}
        //     </div>
        // </div>


        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <UtensilsCrossed size={20} className="text-purple-600"/>
                )}
            </div>

            {/* TEXT */}
            <div>
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>

            <div className="flex items-center gap-2">
{!hideDeleteBtn && (
                    <>
                        <button onClick={onDelete} className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Trash2 size={18}/>
                        </button>
                        <button onClick={onEdit} className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Edit3 size={18}/>
                        </button>
                    </>
                )}


                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className="text-xs font-medium">
                        {/* {type === 'income' ? '+' : '-'}₹{addThousandSeparator(amount)} */}
                        {type === 'income' ? '+' : '-'}₹{amount.toLocaleString()}
                    </h6>
                </div>

                {type === 'income' ? (
                    <TrendingUp size={15}/>
                ) : (
                    <TrendingUp size={15}/>
                )}
            </div>
            
        </div>
    )
}
export default TransactionInfoCard;