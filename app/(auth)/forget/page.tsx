"use client";
import {
  Button,
  InputAdornment,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { sendResetLink } from "@/actions/authentication/forget";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setEmail(val);
    setErrorEmail(!validateEmail(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      setErrorEmail(true);
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }
    setLoading(true);
    try {
      const response = await sendResetLink(email);
      if (response?.success) {
        toast.success("Link sent successfully");
        router.push("/");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send link. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center my-5 align-items-center">
      <form
        onSubmit={handleSubmit}
        className="border rounded shadow p-5 bg-light"
      >
        <Typography variant="h6" className="text-center" gutterBottom>
          Forget Password
        </Typography>

        <TextField
          fullWidth
          value={email}
          onChange={handleEmail}
          label="Email"
          error={errorEmail}
          helperText={errorEmail ? "Invalid email address" : ""}
          variant="outlined"
          className="mx-1 my-3"
          type="email"
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
        <div className="d-flex justify-content-center my-3 align-items-center">
          <Button
            type="submit"
            variant="contained"
            color="inherit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
        <div>
          <p
            className="my-3 text-center"
            style={{ fontSize: "14px", cursor: "pointer" }}
          >
            Already have an account ?{" "}
            <span
              style={{ borderBottom: "1px groove black" }}
              onClick={() => router.push("/login")}
              className="text-dark ms-1"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
