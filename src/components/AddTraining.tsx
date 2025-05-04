import { useState, useEffect, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { saveTraining } from "../TrainingAPI";
import { getCustomerById } from "../CustomerAPI";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { NewTraining } from "../types";

type AddTrainingProps = {
  handleFetch: () => void;
  customerLink: string;
};

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [training, setTraining] = useState<NewTraining>({
    activity: "",
    date: "",
    duration: "",
    customer: props.customerLink,
  });
  const [customerName, setCustomerName] = useState<string>("");

  useEffect(() => {
    if (props.customerLink) {
      getCustomerById(props.customerLink)
        .then((customer) =>
          setCustomerName(`${customer.firstname} ${customer.lastname}`)
        )
        .catch((err: unknown) =>
          console.error("Error fetching customer name:", err)
        );
    }
  }, [props.customerLink]);

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      activity: "",
      date: "",
      duration: "",
      customer: props.customerLink,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = dayjs(newDate).toISOString();
      setTraining((prev) => ({ ...prev, date: formattedDate }));
    }
  };

  const handleSave = () => {
    saveTraining(training)
      .then(() => props.handleFetch())
      .then(() => setOpen(false))
      .catch((err: unknown) => console.error(err));
  };

  return (
    <>
      <Button
        sx={{
          color: "#00502e",
          backgroundColor: "white",
          padding: 0.8,
          "&:hover": {
            backgroundColor: "#00502e",
            color: "whitesmoke",
          },
        }}
        size="small"
        onClick={handleClickOpen}
      >
        Add Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h5" sx={{ color: "#6c757d", fontWeight: "bold" }}>
          New Training
        </DialogTitle>

        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handleDateChange} />
          </LocalizationProvider>

          <TextField
            required
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="duration"
            label="Duration (min)"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="customer"
            label="Customer"
            value={customerName}
            fullWidth
            variant="standard"
            disabled
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 3 }}>
          <Button variant="contained" color="error" size="medium" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" size="medium" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
