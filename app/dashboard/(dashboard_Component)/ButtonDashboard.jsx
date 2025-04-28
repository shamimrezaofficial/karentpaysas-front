function ButtonDashboard({ open, onClick, title }) {
    return (
        <button
            type='button'
            className='flex items-center justify-center cursor-pointer text-white rounded btn bg-gradient-2 w-full md:w-fit px-4 py-2.5 whitespace-nowrap'
            onClick={() => {
                open ? onClick() : onClick(!open);
            }}
        >
            {title}
        </button>
    );
}

export default ButtonDashboard;