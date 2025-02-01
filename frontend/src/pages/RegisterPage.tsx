import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

function RegisterPage() {
  const fristNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const onSubmit = async () => {
    const firstName = fristNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!firstName || !lastName || !email || !password) {
      setError("Data is not valid!");
      return;
    }
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!res.ok) {
      const token = await res.json();
      setError(token);
      return;
    }
    const token = await res.json();
    console.log(token);
    login(email, token);
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
          Register Page
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
            inputRef={fristNameRef}
            label={"Frist Name"}
            name="fristName"
          ></TextField>
          <TextField
            inputRef={lastNameRef}
            label={"Last Name"}
            name="lastName"
          ></TextField>
          <TextField
            inputRef={emailRef}
            label={"Email"}
            name="email"
          ></TextField>
          <TextField inputRef={passwordRef} label="Password" type="password" />
          <Button onClick={onSubmit} variant="contained">
            sign up
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}
export default RegisterPage;
