import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import API_ENDPOINTS from "../util/apiEndpoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
    useUser();

    const[type, setType] = useState("income");
    const[startDate, setStartDate] = useState("");
    const[endDate, setEndDate] = useState("");
    const[sortOrder, setSortOrder] = useState("asc");
    const[sortField, setSortField] = useState("date");
    const[keyword, setKeyword] = useState("");
    const[loading, setLoading] = useState(false);
    const[transactions, setTransactions] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.APPLY_FILTERS, {
                params: {
                    type,
                    startDate,
                    endDate,
                    sortOrder,
                    sortField,
                    keyword
                }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to apply filters", error);
            toast.error(error.response?.data?.message || "Failed to apply filters");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Filter Transaction
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select the filters</h5>
                    </div>
                    
                    <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select value={type} onChange={e => setType(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"/>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"/>
                        </div>

                        <div>
                            <label htmlFor="sortfield" className="block text-sm font-medium mb-1">Sorted Field</label>
                            <select value={sortField} onChange={(e) => setSortField(e.target.value)} id="sortfield" className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500">
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sorted Order</label>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} id="sortorder" className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div className="sm:col-span-1 md:col-span-2 flex items-end">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <input value={keyword} onChange={e => setKeyword(e.target.value)} id="keyword" type="text" placeholder="Search..." className="w-full border rounded px-3 py-2"/>
                            </div>
                            <button onClick={handleSearch} type="submit" className="ml-3 px-4 py-2 bg-purple-300 text-purple-900 rounded-md hover:bg-purple-200 active:scale-95 transition-all duration-200">
                                <Search size={20}/>
                            </button>
                        </div>

                    </form>
                </div>

                <div className="mt-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Filter Transaction</h5>
                    </div>
                    {transactions.length === 0 ? (
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    ) : ""}

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        ""
                    )}

                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format('DD MMM YYYY')}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))}
                </div>

            </div>
        </Dashboard>
    )
}
export default Filter;
