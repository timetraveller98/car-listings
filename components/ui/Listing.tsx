"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setListing } from "@/actions/getListing";
const Listing = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    brand: false,
    model: false,
    year: false,
    price: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formattedData = {
    brand: formData.brand.trim(),
    model: formData.model.trim(),
    year: parseInt(formData.year, 10),
    price: parseFloat(formData.price),
  };

  try {
    const result = await setListing(formattedData);

    if (result.success) {
      toast.success("Listing created successfully.");
      // ✅ Reset form after successful submission
      setFormData({
        brand: "",
        model: "",
        year: "",
        price: "",
      });
      setErrors({
        brand: false,
        model: false,
        year: false,
        price: false,
      });
      router.refresh(); // Optional if you're revalidating the page
    } else {
      toast.error(result.message || "An unexpected error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="d-flex justify-content-center bg-body my-4 align-items-center flex-column">
      <div className="border flex flex-column shadow my-3 bg-light py-4 rounded px-5">
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" className="text-center" gutterBottom>
            Create Car Listing
          </Typography>

          <TextField
            name="brand"
            label="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            error={errors.brand}
            fullWidth
            required
            sx={{ my: 2 }}
          />

          <TextField
            name="model"
            label="Model"
            value={formData.model}
            onChange={handleInputChange}
            error={errors.model}
            fullWidth
            required
            sx={{ my: 2 }}
          />

          <TextField
            name="year"
            label="Year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            error={errors.year}
            fullWidth
            required
            sx={{ my: 2 }}
          />

          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            error={errors.price}
            fullWidth
            required
            sx={{ my: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />

          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="contained"
              color="inherit"
              type="submit"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Listing;
