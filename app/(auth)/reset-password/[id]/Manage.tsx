'use client';

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { verifyTokenAction } from "@/actions/authentication/verify";
import { updatePassword } from "@/actions/authentication/reset";

type UserData = {
  id: string;
  email: string | null;
  emailVerified: boolean;
  name: string;
  role: string;
  contact: string | null;
  image: string | null;
  membershipId: string;
  referral: string | null;
  isEnabled: boolean;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
  address: {
    city: string;
    state: string;
    line1: string;
    line2: string | null;
    postalCode: string;
  } | null;
};

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const token = typeof params.id === "string" ? params.id : "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value.trim().length < 8);
  };

  const verifyToken = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await verifyTokenAction(token);

      if (response.status !== 200 || !response.user) {
        throw new Error("Invalid or expired token.");
      }

      setUserData(response.user);
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
) => {
  e.preventDefault();

  if (password.trim().length < 8) {
    setPasswordError(true);
    toast.error("Password must be at least 8 characters.");
    return;
  }

  if (!userData?.email) {
    toast.error("User not found.");
    return;
  }

  try {
    setLoading(true);

    const res = await updatePassword({ password, email: userData.email });

    if (!res.success) {
      throw new Error(res.error || "An unexpected error occurred.");
    }

    toast.success("Password successfully updated");
    router.push("/");
  } catch (error) {
    console.error("Reset Error:", error);
    toast.error("Failed to reset password.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={6} className="mx-4">
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }} className="bg-light">
        <form onSubmit={handleSubmit} className="mx-3 ">
          <Typography variant="h6" className="text-center" gutterBottom>
            Reset Your Password
          </Typography>

          <FormControl
            fullWidth
            variant="outlined"
            required
            error={passwordError}
            margin="normal"
          >
            <InputLabel htmlFor="new-password">New Password</InputLabel>
            <OutlinedInput
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              label="New Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Typography
            variant="caption"
            display="block"
            color="textSecondary"
            className=" text-center"
            gutterBottom
          >
            Password must be at least 8 characters.
          </Typography>

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Reset"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
