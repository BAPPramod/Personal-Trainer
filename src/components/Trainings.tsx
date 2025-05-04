import { useState, useEffect } from "react";
import { deleteTraining, fetchTrainings } from "../TrainingAPI";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Styles.css";
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { Training } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        {
            cellRenderer: (params: ICellRendererParams) => (
                <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.data._links.self.href)}
                >
                    <DeleteIcon />
                </Button>
            ),
            width: 120,
            headerName: "Actions",
        },
        { field: "activity", headerName: "Activity", filter: true },
        {
            headerName: "Date",
            field: "date",
            filter: true,
            valueFormatter: (params: ValueFormatterParams) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            width: 250,
        },
        {
            field: "duration",
            headerName: "Duration (min)",
            filter: true,
            width: 180,
        },
        {
            headerName: "Customer",
            valueGetter: (params: ValueGetterParams) => {
                const customer = params.data.customerData; // Corrected field to customerData
                return customer ? `${customer.firstname} ${customer.lastname}` : "";
            },
            filter: true,
        },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then((data: Training[]) => setTrainings(data))
            .catch((err) => console.error(err));
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Do you want to delete this trainning?")) {
            deleteTraining(url)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <Box sx={{ width: "100%", marginTop: 10 }}>
            <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, ml: 1, color: "#6c757d" }}
            >
                Trainings
            </Typography>
            <div className="ag-theme-material custom-ag-grid" style={{ height: 500 }}>
                <AgGridReact<Training>
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted!"
            />
        </Box>
    );
}
