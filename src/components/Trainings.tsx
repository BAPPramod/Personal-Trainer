import { useState, useEffect } from "react";
import { fetchTrainings } from "../TrainingAPI";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import { ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { Training } from "../types";
import "../Styles.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: "activity", headerName: "Activity", filter: true },
        {
            headerName: "Date",
            field: "date",
            filter: true,
            valueFormatter: (params: ValueFormatterParams) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
        },
        { field: "duration", headerName: "Duration (min)", filter: true },
        {
            headerName: "Customer",
            valueGetter: (params: ValueGetterParams) => {
                return `${params.data.customer?.firstname ?? ""} ${params.data.customer?.lastname ?? ""
                    }`;
            },
            filter: true,
        },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then((data) => setTrainings(data))
            .catch((err: unknown) => console.error(err));
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
        </Box>
    );
}