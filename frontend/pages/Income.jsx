import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import API_ENDPOINTS from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
import EditIncomeForm from "../components/EditIncomeForm";

const Income = () => {
    useUser();

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [editingIncome, setEditingIncome] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOME);
            setIncomeData(response.data);
        } catch (error) {
            console.error("Failed to fetch income details", error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    };

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch income categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    const handleAddOrEditIncome = async (income) => {
        try {
            if (editingIncome) {
                await axiosConfig.put(API_ENDPOINTS.UPDATE_INCOME(editingIncome.id), {
                    ...income,
                    amount: Number(income.amount),
                });
                toast.success("Income updated successfully");
                setEditingIncome(null);
            } else {
                await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                    ...income,
                    amount: Number(income.amount),
                });
                toast.success("Income added successfully");
            }

            setOpenAddIncomeModal(false);
            fetchIncomeDetails();
        } catch (error) {
            console.error("Failed to save income", error);
            toast.error(error.response?.data?.message || "Failed to save income");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteModal({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting income details", error);
            toast.error(error.response?.data?.message || "Failed to delete income details");
        }
    };

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income-details.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Income details downloaded successfully");
        } catch (error) {
            console.error("Error downloading income details", error);
            toast.error(error.response?.data?.message || "Failed to download income details");
        }
    };

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            toast.success(response.data.message || "Income details email request sent");
        } catch (error) {
            console.error("Error emailing income details", error);
            toast.error(error.response?.data?.message || "Failed to email income details");
        }
    };

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto space-y-6">
                <IncomeOverview
                    transactions={incomeData}
                    onAddIncome={() => {
                        setEditingIncome(null);
                        setOpenAddIncomeModal(true);
                    }}
                />

                <IncomeList
                    transactions={incomeData}
                    onDelete={(id) => setOpenDeleteModal({ show: true, data: id })}
                    onEdit={setEditingIncome}
                    onDownload={handleDownloadIncomeDetails}
                    onEmail={handleEmailIncomeDetails}
                />

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => {
                        setOpenAddIncomeModal(false);
                        setEditingIncome(null);
                    }}
                    title="Add Income"
                >
                    <AddIncomeForm
                        editingItem={editingIncome}
                        onAddIncome={handleAddOrEditIncome}
                        categories={categories}
                    />
                </Modal>

                <Modal
                    isOpen={!!editingIncome}
                    onClose={() => setEditingIncome(null)}
                    title="Edit Income"
                >
                    <EditIncomeForm
                        incomeItem={editingIncome}
                        onUpdate={handleAddOrEditIncome}
                        categories={categories}
                        onCancel={() => setEditingIncome(null)}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteModal.show}
                    onClose={() => setOpenDeleteModal({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure want to delete this income details?"
                        onDelete={() => deleteIncome(openDeleteModal.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Income;
