import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import { useMemo, useState } from "react";
import Pagination from "../common/Pagination";
import useFetch from "../hooks/useFetch";

const Commments = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("postId");
    const [sortOrder, setSortOrder] = useState("asc");

    const { data: comments } = useFetch("https://jsonplaceholder.typicode.com/comments")

    const filteredSortedComments = useMemo(() => {
        let filtered = comments?.filter((item) => {
            return [item?.postId.toString(), item?.name, item.email].some((field) =>
                field.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        );
        if (sortField && sortOrder) {
            filtered?.sort((a, b) => {
                const aField = a[sortField].toString().toLowerCase();
                const bField = b[sortField].toString().toLowerCase();

                if (aField < bField) return sortOrder === "asc" ? -1 : 1;
                if (aField > bField) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [comments, searchTerm, sortField, sortOrder]);

    const lastPostIndex = currentPage * rowsPerPage;
    const firstPostIndex = lastPostIndex - rowsPerPage;
    const currentPosts = filteredSortedComments?.slice(
        firstPostIndex,
        lastPostIndex
    );

    const handleSort = (field) => {
        if (sortField !== field) {
            setSortField(field);
            setSortOrder("asc");
        } else {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortField(null);
                setSortOrder(null);
            } else {
                setSortOrder("asc");
            }
        }
    }

    return (
        <div className="box-content m:0 p-2">
            <div className="flex  justify-evenly p-2">

                {["postId", "name", "email", "body"]?.map((field) => (
                    <button key={field} className="border-b-gray-400 rounded">
                        {field !== "body" && (
                            <TableSortLabel
                                active={sortField === field}
                                direction={sortOrder || "asc"}
                                onClick={() => handleSort(field)}
                            >
                                {field?.charAt(0).toUpperCase() + field?.slice(1)}
                            </TableSortLabel>
                        )}
                    </button>
                ))}
                <button className="md:w-1/3 p-3 border rounded-md w-full flex gap-3 md:px-16">
                    <svg className="style_icon__KAdjP" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                    <input
                        type="text"
                        placeholder="Search by ID, Name, Email"
                        className="w-full m-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </button>
            </div >

            <TableContainer border="1" cellPadding="2" cellSpacing="0" className="hidden md:block md:border md:px-16">
                <Table>
                    <TableHead className="bg-gray-200 border-full">
                        <TableRow>
                            <TableCell>PostID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Commment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts?.map(each => {
                            return (<TableRow key={each?.id}>
                                <TableCell >{12345670 + each?.id + each?.postId}</TableCell >
                                <TableCell className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:overflow-wrap break-word p-2" >{each?.name.charAt(0).toUpperCase() + each?.name.slice(1)}</TableCell >
                                <TableCell >{each?.email}</TableCell >
                                <TableCell className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:overflow-wrap break-word p-2">{each?.body}</TableCell >
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="block md:hidden mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentPosts?.map((each) => (
                        <div
                            key={each?.id}
                            className="bg-white border rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="text-sm font-bold text-gray-700 mb-1">
                                Post ID: {12345670 + each?.id + each?.postId}
                            </h3>
                            <p className="text-base font-semibold text-gray-800">
                                Name: {each?.name.charAt(0).toUpperCase() + each?.name.slice(1)}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Email:</span> {each?.email}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Comment:</span> {each?.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                totalRows={filteredSortedComments?.length}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    )

}

export default Commments
