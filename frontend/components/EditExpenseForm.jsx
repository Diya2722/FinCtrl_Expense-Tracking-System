import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerpopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const EditExpenseForm = ({ expenseItem, onUpdate, categories, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    useEffect(() => {
        if (expenseItem) {
            setFormData({
                name: expenseItem.name || '',
                amount: expenseItem.amount || '',
                date: expenseItem.date || '',
                icon: expenseItem.icon || '',
                categoryId: expenseItem.categoryId || expenseItem.category?.id || ''
            });
        }
    }, [expenseItem]);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setFormData(prev => ({...prev, [key]: value}));
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            toast.error("Enter expense name");
            return;
        }
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            toast.error("Enter valid amount");
            return;
        }
        if (!formData.categoryId) {
            toast.error("Select category");
            return;
        }
        if (!formData.date) {
            toast.error("Select date");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            onUpdate({
                id: expenseItem.id,
                ...formData,
                amount: Number(formData.amount)
            });
            setLoading(false);
        }, 500);
    };

    return (
        <div className="space-y-4">
            <EmojiPickerPopup 
                icon={formData.icon}
                onIconSelect={(icon) => handleChange('icon', icon)}
            />
            <Input 
                label="Expense Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Grocery"
                type="text"
            />
            <Input
                label="Category"
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                label="Amount"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0.00"
                type="number"
            />
            <Input
                label="Date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                type="date"
            />
            <div className="flex gap-3 justify-end pt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2 transition"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Update Expense'
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditExpenseForm;

