function ModalHeader({ title, action }) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <button
          onClick={action}
          className="bg-red-500 hover:bg-red-600 text-white p-1 w-8 h-8 rounded-full text-lg font-bold flex items-center justify-center"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default ModalHeader;
