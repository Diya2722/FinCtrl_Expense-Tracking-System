import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({content, onDelete}) => {

    const [loading, setLoading] = useState(false);
    const DeleteAlert = ({content, setLoading}) => useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="flex items-center gap-2 bg-purple-300 text-purple-900 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-purple-200 active:scale-95 transition-all duration-200">
                    {loading ? (
                        <>
                             <LoaderCircle className="h-4 w-4 animated-spin"/>
                             Deleting...
                        </>
                    ) : (
                        "Delete"
                    )}
                </button>
            </div>
        </div>
    )
}
export default DeleteAlert;