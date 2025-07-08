import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";

const Commments = () => {
    const [comments, setComments] = useState([])
    // const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getComments = async () => {
        const COMMENT_URL = "https://jsonplaceholder.typicode.com/comments"
        try {
            const response = await fetch(COMMENT_URL);
            if (response.ok === true) {
                const data = await response.json()
                setComments(data)
            } else {
                console.log("Unable to fetch comments")
            }
        } catch (error) {
            console.log('Failed to fetch comments: ', error)
        }
    }

    useEffect(() => {
        getComments()
    })


    const lastPostIndex = currentPage * rowsPerPage;
    const firstPostIndex = lastPostIndex - rowsPerPage;
    const currentPosts = comments.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <TableContainer border="1" cellPadding="10" cellSpacing="0">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>PostID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Commment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts.map((each, index) => {
                            return (<TableRow key={each.id}>
                                <TableCell >{each.id}</TableCell >
                                <TableCell >{each.name}</TableCell >
                                <TableCell >{each.email}</TableCell >
                                <TableCell className="w-[15px] overflow-hidden whitespace-nowrap text-overflow-ellipsis">{each.body}</TableCell >
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                totalRows={comments.length}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setRowsPerPage={setRowsPerPage}
            />
        </>
    )

}

export default Commments
