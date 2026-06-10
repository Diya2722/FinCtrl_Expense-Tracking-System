import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerpopup";
import Input from "../components/Input";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddExpenseForm = ({onAddExpense, categories}) => {
    
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value});
    };

    const handleSubmit = () => {
        if (!expense.name) {
            toast.error("Enter expense name");
            return;
        }

        if (!expense.amount) {
            toast.error("Enter amount");
            return;
        }

        if (!expense.categoryId) {
            toast.error("Select category");
            return;
        }

        if (!expense.date) {
            toast.error("Select date");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            onAddExpense(expense);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        if(categories.length > 0 && !expense.categoryId) {
            setExpense(prev => ({...prev, categoryId: categories[0].id}));
        }
    },[categories, expense.categoryId]);

    return (
        <div>
            <EmojiPickerPopup 
                icon={expense.icon}
                onIconSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input 
                value={expense.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Expense Name"
                placeholder="e.g. Uber, Electricity, Groceries"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label="Amount"
                value={expense.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                placeholder="e.g. 50.00"
                type="number"
            />

            <Input
                label="Date"
                value={expense.date}
                onChange={({target}) => handleChange('date', target.value)}
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 bg-red-300 text-red-900 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-red-200 active:scale-95 transition-all duration-200">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Expense" : "Add Expense"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}  
export default AddExpenseForm;