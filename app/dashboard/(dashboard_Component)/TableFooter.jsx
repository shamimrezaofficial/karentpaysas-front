'use client';
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
function TableFooter({ startIndex, data, totalItems, currentPage, totalPages, handlePageChange }) {
    return (
        <nav
            className='flex flex-col items-start justify-between px-6 py-3 mt-2 space-y-3 md:flex-row md:items-center md:space-y-0 '
            aria-label='Table navigation'
        >
            <span className='font-normal whitespace-nowrap'>
                Showing {startIndex + 1} - {startIndex + data?.length} of{' '}{totalItems} results
            </span>
            <div className='w-full flex justify-center md:justify-end'>
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={handlePageChange}
                    maxWidth={300}
                    previousLabel=""
                    nextLabel=""
                    pageItemClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="previous-item"
                    nextClassName="next-item"
                    activeClassName="active"
                />
            </div>
        </nav>
    );
}

export default TableFooter;