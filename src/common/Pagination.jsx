import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const Pagination = ({ totalRows, rowsPerPage, setRowsPerPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const [currentIndex, setCurrentIndex] = useState(1);

    // on component mount: load from localStorage or default to 1
    useEffect(() => {
        const savedPage = localStorage.getItem("currentPage")
        const savedRange = localStorage.getItem("currentRange")
        const page = savedPage ? parseInt(savedPage) : 1;
        const range = savedRange
        setCurrentPage(page)
        setRowsPerPage(range)
        setCurrentIndex(page)
    }, []);

    // on current page change: save to local storage to save index of pagination
    useEffect(() => {
        if (currentPage) {
            localStorage.setItem("currentPage", currentPage)
            setCurrentIndex(currentPage)
        }
    }, [currentPage])

    const getVisiblePages = () => {
        const maxButtons = 3;
        let startPage = Math.max(1, currentIndex - 3);
        let endPage = Math.min(totalPages, startPage + maxButtons);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleRowsPerPageChange = (e) => {
        const newLimit = parseInt(e.target.value);
        localStorage.setItem("currentRange", newLimit)
        setRowsPerPage(newLimit);
        setCurrentPage(currentPage); // Reset to page 1 to avoid invalid pages
    };
    return (
        <div className="flex flex-wrap justify-end mt-1">
            <div className="mr-2 text-center">
                <span>
                    {`${(currentIndex - 1) * rowsPerPage + 1} -
                ${currentPage * rowsPerPage} of ${totalRows} items`}
                </span>
            </div>
            <div className="buttons flex gap-2">
                {currentPage > 1 && (
                    <button onClick={handlePrev} className="preBtn px-3 py-1 bg-gray-300 rounded">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                )}

                {getVisiblePages().map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-[40px] h-[40px] rounded-[6px]
                            ${currentPage === page ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={handleNext} className="nextBtn px-3 py-1 bg-gray-300 rounded">
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
            <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="px-2 py-1 border rounded ml-2"
            >
                {[5, 10, 20, 50, 100].map((value) => (
                    <option key={value} value={value}>
                        {value} / Page
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pagination;
