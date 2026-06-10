import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser"; 
import CategoryList from "../components/Categorylist";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import API_ENDPOINTS from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategotyForm";


const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const[selectCategory, setSelectCategory] = useState(null);
    

    const fetchCategoryDetails = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200) {
                setCategoryData(response.data);
            }
            
        } catch(error) {
            console.error('Something went wrong. Please try again', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        // console.log('Category added successfully', category);

        // api..
        const {name, type, icon} = category;

        if(!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        // check if the category already exists
        const isDuplicate = categoryData.some((cat) => 
            cat.name.toLowerCase() === name.trim().toLowerCase()
        );

        if(isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201){
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error(error.response?.data?.message || "Falied to add category");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    const handleUpdateCategory = async(updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()) {
            toast.error("Category Name is required");
            return;
        }
        if(!id) {
            toast.error("Category ID is required for update");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        } catch (error) {
            console.error('Error updating category:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">

                {/* add button to add category */}
                <div onClick={() => setOpenAddCategoryModal(true)} className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>

                    <button className="flex items-center gap-2 text-green-600 bg-green-100 bg-opacity-30 px-3 py-1.5 rounded-md font-medium text-sm hover:bg-green-200 hover:bg-opacity-40 transition-all duration-150">
                        <Plus size={16} /> Add Category
                    </button>

                </div>

                {/* category list */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/* adding category model */}
                <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
                    <AddCategoryForm onAddCategory = {handleAddCategory}/>
                </Modal>


                {/* updating category modal */}
                <Modal isOpen={openEditCategoryModal} 
                        onClose={() => {setOpenEditCategoryModal(false); 
                                        setSelectCategory(null);}} 
                        title="Update Category">
                    <AddCategoryForm 
                            initialCategoryData={selectCategory}
                            onAddCategory={handleUpdateCategory}
                            isEditing={true}
                            />
                </Modal>

            </div>
        </Dashboard>
    )
}
export default Category;
