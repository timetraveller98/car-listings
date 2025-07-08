"use client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import EmailIcon from "@mui/icons-material/Email";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") ||
    (typeof window !== "undefined" ? window.location.pathname : "/");

  // Show Password Start
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // Show Password End

  // Password Validation Start
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorPassword(event.target.value.trim() === "");
  };
  // Password Validation End

  // Email Validate Start
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(!validateEmail(event.target.value));
  };
  // Email Validate End

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(email.trim() === "");
    setErrorPassword(password.trim() === "");
    if (password.trim() === "" || email.trim() === "") {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const signInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (signInData?.error) {
        if (signInData.error === "User account is disabled.") {
          toast.error("Your account is disabled");
        } else if (signInData.error === "User account is not verified.") {
          toast.error("Please verify your email");
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        router.push(callbackUrl);
        toast.success("Successfully logged in");
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to log in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center my-5 align-items-center">
      <div className="border rounded shadow bg-light p-5">
        <Typography variant="h6" className="text-center" gutterBottom>
         Access Account
        </Typography>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          className="my-3"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
          type="email"
          error={errorEmail}
          helperText={errorEmail ? "Invalid email address" : ""}
          value={email}
          autoComplete="off"
          onChange={handleEmail}
          required
        />
        <br />
        <FormControl
          className="my-3"
          required
          variant="outlined"
          error={errorPassword}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff color="action" />
                  ) : (
                    <Visibility color="action" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>
        <div className="d-flex justify-content-center my-2 align-items-center">
          <Button
            onClick={handleSubmit}
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
            Don&apos;t have an account ?
            <span
              style={{ borderBottom: "1px groove black" }}
              className="text-dark ms-1"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
        <div>
          <p
            className="my-3 text-center"
            style={{ fontSize: "14px", cursor: "pointer" }}
          >
            <span
              style={{ borderBottom: "1px groove black" }}
              className="text-dark"
              onClick={() => router.push("/forget")}
            >
              Forget Password
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
