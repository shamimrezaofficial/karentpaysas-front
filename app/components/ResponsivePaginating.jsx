"use client";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

function ResponsivePaginating({currentPage, totalPages, handlePageChange}) {
    return (
        <>
            <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
                maxWidth={400}
                previousLabel=""
                nextLabel=""
                pageItemClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="previous-item"
                nextClassName="next-item"
                activeClassName="active"
            />
        </>
    );
}

export default ResponsivePaginating;