"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ConfirmDialogProps {
  open: boolean;
  id:string;
  onClose: () => void;
}

const ConfirmDialog:React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  id
}) => {
  const [prescription, setPrescription] = useState("");
  const router = useRouter();
  const handleConfirm = async () => {
    try {
      await axios.put(`/api/customerprescription/${id}`, {
        id,
        status: "confirmed",
        prescription,
      });
      toast.success("Submitted");
      onClose();
      router.refresh();
    } catch (error) {
      console.error("PUT Request Error:", error);
      toast.error("Oops! Something went wrong");
    }
  };
  

  return (
    <Dialog 
    open={open} 
    onClose={onClose} 
    maxWidth="sm" 
    fullWidth
    PaperProps={{
      sx: { borderRadius: 3, p: 2 }
    }}
  >
    <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}>
      🏥 Doctor Prescription
    </DialogTitle>

    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <Typography variant="body1" sx={{ color: "gray" }}>
        Please enter the prescription details for the patient.
      </Typography>

      <TextField
        autoFocus
        label="Enter Prescription"
        type="text"
        rows={4}
        multiline
        fullWidth
        variant="outlined"
        placeholder="Write doctor's instructions here..."
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
      />
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 2, display: "flex", justifyContent: "space-between" }}>
      <Button onClick={onClose} color="error" variant="contained" sx={{ borderRadius: 2, textTransform: "none" }}>
        Cancel
      </Button>
      <Button 
        onClick={handleConfirm} 
        color="success" 
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default  ConfirmDialog;
