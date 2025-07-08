"use client";
import { useState } from "react";
import {
  FormControl,
  Button,
  InputAdornment,
  TextField,
  InputLabel,
  IconButton,
  OutlinedInput,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setUsers } from "@/actions/getUsers";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
const CustomerForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: name === "email" ? !validateEmail(value) : value.trim() === "",
    }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await setUsers(formData);

      if (result.success) {
        toast.success("Register Successpully.");
        router.push("/login");
      } else {
        toast.error(result.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email Already Exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center bg-body my-4 align-items-center flex-column">
      <div className="border flex flex-column shadow my-3 bg-light py-4 rounded px-5">
        <form onSubmit={handleSubmit}>
           <Typography variant="h6" className="text-center" gutterBottom>
         Create Account
        </Typography>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="Name"
            error={errors.name}
            variant="outlined"
            autoComplete="off"
            fullWidth
            sx={{ my: 2}}
            required
              InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
          />
          <br />
          <TextField
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            label="Email"            error={errors.email}
            helperText={errors.email ? "Invalid email address" : ""}
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
            autoComplete="off"
            required
                   InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
          />
          <br />
          <FormControl sx={{ my: 2 }} required variant="outlined" fullWidth error={errors.password}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>
          <br />

          <div className="d-flex justify-content-center align-items-center">
            <Button variant="contained" color="inherit" sx={{ mt: 2 }} type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </div>
        </form>

        <p className="my-3 text-center" style={{ fontSize: "14px", cursor: "pointer" }}>
          Already have an account ?{" "}
          <span
            style={{ borderBottom: "1px groove black" }}
            onClick={() => router.push("/login")}
            className="text-dark"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomerForm;
