import { useEffect, useMemo, useState } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import TablePagination from '@mui/material/TablePagination';



const Commments = () => {
    const [comments, setComments] = useState([])
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getComments = async () => {
        const COMMENT_URL = "https://jsonplaceholder.typicode.com/comments"
        try {
            const response = await fetch(COMMENT_URL);
            if (response.ok === true) {
                const data = await response.json()
                setComments(data)
                console.log(comments)
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


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const visibleRows = useMemo(
        () =>
            [...comments]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, comments],
    );
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
                        {visibleRows.map((each, index) => {
                            const isItemSelected = selected.includes(comments.id);
                            // const labelId = `enhanced-table-checkbox-${index}`;
                            return (<TableRow hover
                                onClick={(event) => handleClick(event, comments.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                                sx={{ cursor: 'pointer' }}
                                key={each.id}>
                                <TableCell >{each.id}</TableCell >
                                <TableCell >{each.name}</TableCell >
                                <TableCell >{each.email}</TableCell >
                                <TableCell >{each.body}</TableCell >
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={comments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )

}

export default Commments
