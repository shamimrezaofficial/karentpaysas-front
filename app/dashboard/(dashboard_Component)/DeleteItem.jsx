import { FaSpinner } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";


function DeleteItem(deleteModalOpen, setDeleteModalOpen) {
    return (
        <div>
            {deleteModalOpen && (
                <div
                    id='popup-modal'
                    className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 '
                >
                    <div className='relative p-4 w-full max-w-md max-h-full'>
                        <div className='relative bg-white rounded-lg shadow'>
                            <div className='p-4 pr-10 md:p-5 text-center'>
                                <div className='flex justify-center items-center text-[60px] text-red-600'>
                                    <MdDeleteForever />
                                </div>
                                <h3 className='mb-5 text-lg font-normal text-black'>
                                    Are you sure? <br /> you want to delete this Link
                                </h3>
                                {/* Add your modal content here */}
                                <div className='flex items-center justify-center gap-2'>
                                    <button
                                        onClick={handleDeleteLink}
                                        type='button'
                                        className='text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-[4px] text-sm flex items-center justify-center gap-2 px-5 py-2.5 text-center'
                                    >
                                        {LoadingDelete ? (
                                            <>
                                                <FaSpinner className='animate-spin' /> Loading...
                                            </>
                                        ) : (
                                            'Yes, I am sure'
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setDeleteModalOpen(false)}
                                        type='button'
                                        className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-[4px] border border-gray-200 hover:bg-gray-200  cursor-pointer '
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteItem;