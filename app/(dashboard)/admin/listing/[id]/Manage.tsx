"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCarById, updateCarById } from "@/actions/updateCar";
import { useQueryClient } from "@tanstack/react-query";

interface CarProp {
  brand: string;
  model: string;
  year: number;
  price: number;
}

const ManageCar = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<CarProp | null>(null);
  const [formData, setFormData] = useState<CarProp>({
    brand: "",
    model: "",
    year: 2020,
    price: 0,
  });

  const [errors, setErrors] = useState({
    year: false,
    brand: false,
    model: false,
    price: false,
  });

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        if (data) {
          setCarData(data);
        }
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (carData) {
      setFormData({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        price: carData.price,
      });
    }
  }, [carData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberField = name === "year" || name === "price";

    setFormData((prev) => ({
      ...prev,
      [name]: isNumberField ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim?.() === "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { brand, model, year, price } = formData;

    const newErrors = {
      brand: brand.trim() === "",
      model: model.trim() === "",
      year: !year,
      price: !price,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return toast.error("Please fill out all required fields correctly.");
    }

    setLoading(true);
    try {
      
      const response = await updateCarById(id, formData);
      if (response) {
        toast.success("Car listing updated successfully.");
        await queryClient.invalidateQueries({ queryKey: ["listings"] });
        router.push("/admin/listing");
      } else {
        toast.error("Failed to update car data.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center bg-body my-4 mx-3 align-items-center flex-column">
      <div className="border shadow my-3 bg-light py-4 rounded px-5">
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" className="text-center" gutterBottom>
            Update Car Listing
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
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
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

export default ManageCar;
