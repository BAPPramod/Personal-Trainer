import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { fetchTrainings } from "../TrainingAPI";
import _ from "lodash";
import { CircularProgress, Typography, Box } from "@mui/material";
import { Training } from "../types";
import { GroupedTraining } from "../types";


// Type for the grouped data used in the chart
export default function Statistics() {
    const [trainingData, setTrainingData] = useState<GroupedTraining[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTrainings()
            .then((data: Training[]) => {
                const groupedData: GroupedTraining[] = _(data)
                    .groupBy("activity")
                    .map((trainings, activity) => ({
                        activity,
                        totalDuration: _.sumBy(trainings, "duration"),
                    }))
                    .value();

                setTrainingData(groupedData);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box sx={{ mt: 10 }}>
            <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, ml: 1, color: "#00502e" }}
            >
                Activity Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={trainingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <XAxis
                        dataKey="activity"
                        label={{
                            value: "Activities",
                            position: "insideBottom",
                            offset: -15,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Duration (min)",
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle" },
                        }}
                    />
                    <Tooltip />
                    <Legend payload={[]} />
                    <Bar dataKey="totalDuration" fill="#00502e" name="Total Duration" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
