import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerpopup";
import Input from "../components/Input";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddIncomeForm = ({onAddIncome, categories, editingItem}) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(!!editingItem);


    useEffect(() => {
        if (editingItem) {
            setIncome({
                name: editingItem.name || '',
                amount: editingItem.amount || '',
                date: editingItem.date || '',
                icon: editingItem.icon || '',
                categoryId: editingItem.categoryId || ''
            });
            setIsEditing(true);
        } else {
            setIncome({
                name: "",
                amount: "",
                date: "",
                icon: "",
                categoryId: ""
            });
            setIsEditing(false);
        }
    }, [editingItem]);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    const handleChange = (key, value) => {
        setIncome(prev => ({...prev, [key]: value}));
    };

    const handleSubmit = () => {
        if (!income.name) {
            toast.error("Enter income source");
            return;
        }

        if (!income.amount) {
            toast.error("Enter amount");
            return;
        }

        if (!income.categoryId) {
            toast.error("Select category");
            return;
        }

        if (!income.date) {
            toast.error("Select date");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            onAddIncome(income);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        if(categories.length > 0 && !income.categoryId) {
            setIncome(prev => ({...prev, categoryId: categories[0].id}));
        }
    },[categories, income.categoryId]);

    return (
        <div>
            <EmojiPickerPopup 
                icon={income.icon}
                onIconSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input 
                value={income.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Income Source"
                placeholder="e.g. Salary, Freelancing, Bonus"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label="Amount"
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                placeholder="e.g. 500.00"
                type="number"
            />

            <Input
                label="Date"
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 bg-purple-300 text-purple-900 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-purple-200 active:scale-95 transition-all duration-200">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Income" : "Add Income"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}  
export default AddIncomeForm;