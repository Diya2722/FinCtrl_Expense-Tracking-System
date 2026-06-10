import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import API_ENDPOINTS from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";
import EditExpenseForm from "../components/EditExpenseForm";

const Expense = () => {
    useUser();

    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
            setExpenseData(response.data);
        } catch (error) {
            console.error("Failed to fetch expense details", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch expense categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    const handleAddExpense = async (expense) => {
        try {
            await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                ...expense,
                amount: Number(expense.amount),
            });
            toast.success("Expense added successfully");
            setOpenAddExpenseModal(false);
            fetchExpenseDetails();
        } catch (error) {
            console.error("Failed to add expense", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const handleUpdateExpense = async (updated) => {
        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_EXPENSE(updated.id), updated);
            toast.success("Expense updated successfully");
            setEditingExpense(null);
            fetchExpenseDetails();
        } catch (error) {
            console.error("Failed to update expense", error);
            toast.error(error.response?.data?.message || "Failed to update expense");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteModal({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense details", error);
            toast.error(error.response?.data?.message || "Failed to delete expense details");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense-details.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully");
        } catch (error) {
            console.error("Error downloading expense details", error);
            toast.error(error.response?.data?.message || "Failed to download expense details");
        }
    };

    const handleEmailExpenseDetails = async () => {
        toast("Expense email endpoint is not wired on the current UI.");
    };

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto space-y-6">
                <ExpenseOverview
                    transactions={expenseData}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                />

                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => setOpenDeleteModal({ show: true, data: id })}
                    onEdit={setEditingExpense}
                    onDownload={handleDownloadExpenseDetails}
                    onEmail={handleEmailExpenseDetails}
                />

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm
                        onAddExpense={handleAddExpense}
                        categories={categories}
                    />
                </Modal>

                <Modal
                    isOpen={!!editingExpense}
                    onClose={() => setEditingExpense(null)}
                    title="Edit Expense"
                >
                    <EditExpenseForm
                        expenseItem={editingExpense}
                        onUpdate={handleUpdateExpense}
                        categories={categories}
                        onCancel={() => setEditingExpense(null)}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteModal.show}
                    onClose={() => setOpenDeleteModal({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense details?"
                        onDelete={() => deleteExpense(openDeleteModal.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Expense;
