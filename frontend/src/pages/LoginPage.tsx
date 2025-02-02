import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth();
  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("Data is not valid!");
      return;
    }
const res = await fetch(`${BASE_URL}/user/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});

if (!res.ok) {
  try {
    const err = await res.text(); // Try parsing error response as JSON
    setError(err || "Login failed!");
  } catch {
    setError("An unexpected error occurred!");
  }
  return;
}

const token = await res.text(); // Use text() for token if successful

if (!token) {
  setError("Something went wrong!");
  return;
}

login(email, token);
navigate('/')
setError("");

  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mt: "30px" }}>
          Login to Your Account
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            mt: "15px",
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField
            inputRef={emailRef}
            label={"Email"}
            name="email"
          ></TextField>
          <TextField inputRef={passwordRef} label="Password" type="password" />
          <Button onClick={onSubmit} variant="contained">
            Login Page
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}
export default LoginPage;
