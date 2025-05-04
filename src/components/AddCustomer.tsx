import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { saveCustomer } from "../CustomerAPI";
import { Customer } from "../types";

type AddCustomerProps = {
    handleFetch: () => void;
};

export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({} as Customer); // reset form when opened
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addCustomer = () => {
        saveCustomer(customer)
            .then(() => props.handleFetch())
            .then(() => setOpen(false))
            .catch((err: unknown) => console.error(err));
    };

    

    return (
        <>
            <Button>
                <PersonAddIcon
                    sx={{ marginRight: "8px", fontSize: 38, color: "#00502e" }}
                    onClick={handleClickOpen}
                />
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h5" sx={{ color: "#6c757d", fontWeight: "bold" }}>
                    New Customer
                </DialogTitle>

                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="First name"
                        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Last name"
                        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Street Address"
                        onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Postcode"
                        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="City"
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Email"
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Phone Number"
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", gap: 3 }}>
                    <Button variant="contained" color="error" size="medium" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" size="medium" onClick={addCustomer}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}