import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

function RegisterPage() {
  const fristName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fristName.current?.value,
        lastName: lastName.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      }),
    });
    if (!res.ok) {
            const data = await res.json();
      setError(data);
      return;
    }
    const data = await res.json();
    console.log(data);
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
            inputRef={fristName}
            label={"Frist Name"}
            name="fristName"
          ></TextField>
          <TextField
            inputRef={lastName}
            label={"Last Name"}
            name="lastName"
          ></TextField>
          <TextField inputRef={email} label={"Email"} name="email"></TextField>
          <TextField inputRef={password} label="Password" type="password" />
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
