import { useState, useEffect, useRef } from "react";
import { fetchCustomers, deleteCustomer, updateCustomer } from "../CustomerAPI";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import type { GridApi } from 'ag-grid-community';
import { Box, Typography } from "@mui/material";
import { Customer } from "../types";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import "../Styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import { saveAs } from "file-saver";

ModuleRegistry.registerModules([AllCommunityModule]);

// API fetch type
type FetchResponse = {
    _embedded: {
        customers: Customer[];
    };
};

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [editRowId, setEditRowId] = useState<string | null>(null);
    const gridApi = useRef<GridApi | null>(null);

    const colDefs: ColDef[] = [
        {
            cellRenderer: (params: ICellRendererParams) => {
                const isEditing = params.node.id === editRowId;
                const customerLink = (params.data as Customer)._links.self.href;
                return (
                    <div>
                        {isEditing ? (
                            <>
                                <Button
                                    color="success"
                                    size="small"
                                    onClick={() => handleSave(params)}
                                >
                                    <CheckIcon />
                                </Button>
                                <Button
                                    color="error"
                                    size="small"
                                    onClick={() => handleCancel()}
                                >
                                    <CloseIcon />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(customerLink)}
                                >
                                    <DeleteIcon />
                                </Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    onClick={() => params.node.id && handleEdit(params.node.id)}
                                >
                                    <ModeEditIcon />
                                </Button>
                            </>
                        )}
                        <AddTraining handleFetch={handleFetch} customerLink={customerLink} />
                    </div>
                );
            },
            width: 270,
            headerName: "Actions",
        },
        {
            field: "firstname",
            filter: true,
            width: 160,
            editable: (params) => params.node.id === editRowId,
            headerName: "First name",
        },
        {
            field: "lastname",
            filter: true,
            width: 160,
            editable: (params) => params.node.id === editRowId,
            headerName: "Last name",
        },
        {
            field: "streetaddress",
            filter: true,
            editable: (params) => params.node.id === editRowId,
            headerName: "Street address",
        },
        {
            field: "postcode",
            filter: true,
            width: 160,
            editable: (params) => params.node.id === editRowId,
            headerName: "Postcode",
        },
        {
            field: "city",
            filter: true,
            width: 160,
            editable: (params) => params.node.id === editRowId,
            headerName: "City",
        },
        {
            field: "email",
            filter: true,
            editable: (params) => params.node.id === editRowId,
            headerName: "Email",
        },
        {
            field: "phone",
            filter: true,
            editable: (params) => params.node.id === editRowId,
            headerName: "Phone",
        },
    ];

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then((data: FetchResponse) => setCustomers(data._embedded.customers))
            .catch((err: unknown) => console.error(err));
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Do you want to delete this customer?")) {
            deleteCustomer(url)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch((err: unknown) => console.error(err));
        }
    };

    const handleEdit = (rowId: string) => {
        setEditRowId(rowId);
        gridApi.current?.refreshCells({ force: true });
    };

    const handleSave = (params: ICellRendererParams) => {
        const updatedCustomer = params.data as Customer;
        updateCustomer(updatedCustomer._links.self.href, updatedCustomer)
            .then(() => {
                setCustomers((prevCustomers) =>
                    prevCustomers.map((customer) =>
                        customer._links.self.href === updatedCustomer._links.self.href
                            ? updatedCustomer
                            : customer
                    )
                );
                setEditRowId(null);
                gridApi.current?.refreshCells({ force: true });
            })
            .catch((err: unknown) => console.error(err));
    };


    const handleCancel = () => {
        setEditRowId(null);
        handleFetch();
        gridApi.current?.refreshCells({ force: true });
    };

    const exportToCSV = (customers: Customer[]) => {
        const filteredCustomers = customers.map(
            ({
                firstname,
                lastname,
                streetaddress,
                postcode,
                city,
                email,
                phone,
            }) => ({
                firstname,
                lastname,
                streetaddress,
                postcode,
                city,
                email,
                phone,
            })
        );
        const csvContent = [
            [
                "First name",
                "Last name",
                "Street address",
                "Postcode",
                "City",
                "Email",
                "Phone",
            ],
            ...filteredCustomers.map((c) => [
                c.firstname,
                c.lastname,
                c.streetaddress,
                c.postcode,
                c.city,
                c.email,
                c.phone,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "customers.csv");
    };

    return (
        <Box sx={{ width: "100%", marginTop: 10 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 2, ml: 1, color: "#6c757d" }}
                >
                    Customers
                </Typography>
                <Box>
                    <AddCustomer handleFetch={handleFetch} />
                    <Button
                        sx={{
                            color: "whitesmoke",
                            backgroundColor: "#00502e",
                            padding: 0.8,
                            "&:hover": {
                                backgroundColor: "whitesmoke",
                                color: "#00502e",
                            },
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => exportToCSV(customers)}
                    >
                        Export to CSV
                    </Button>
                </Box>
            </Box>
            <div className="ag-theme-material custom-ag-grid" style={{ height: 500 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                    onGridReady={(params) => (gridApi.current = params.api)}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted!"
            />
        </Box>
    );
}