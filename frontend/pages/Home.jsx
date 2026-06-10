import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser"; 
import InfoCard from "../components/InfoCard";
import { addThousandSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import RecentTransaction from "../components/RecentTransaction";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";
import API_ENDPOINTS from "../util/apiEndpoints";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if(response.status === 200){
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    },[])    

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* display the cards */}
                        <InfoCard
                            icon={<WalletCards />}
                            label="Total Balance"
                            value={addThousandSeparator(dashboardData ?.totalBalance || 0)}
                            color="bg-purple-800"
                        />

                        <InfoCard
                            icon={<Wallet />}
                            label="Total Income"
                            value={addThousandSeparator(dashboardData ?.totalIncome || 0)}
                            color="bg-green-800"
                        />

                        <InfoCard
                            icon={<Coins />}
                            label="Total Expense"
                            value={addThousandSeparator(dashboardData ?.totalExpense || 0)}
                            color="bg-red-800"
                        />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* recent transaction*/}
                        <RecentTransaction
                            transactions={dashboardData?.RecentTransaction}
                            onMore={() => navigate("/expense")}
                        />
                        
                        {/* finance overview chart*/}

                        <FinanceOverview 
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />
    
                        {/* expense transaction*/}
                        <Transactions 
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate('/expense')}
                            type="expense"
                            title="Recent Expenses"
                        />

                        {/* income transaction*/}
                        <Transactions 
                            transactions={dashboardData?.recent5Income || []}
                            onMore={() => navigate('/income')}
                            type="income"
                            title="Recent Incomes"
                        />
                         
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
export default Home;
