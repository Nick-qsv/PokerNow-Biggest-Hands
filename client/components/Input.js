import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export const Input = () => {
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
      component="form"
      onSubmit={handleSubmit1(onSubmit)}
      key={1}
    >
      <h2>Put your PokerNow Link below to see the Biggest Hands!</h2>
      <TextField
        required
        autoFocus
        {...register1("PokerNow Link", { required: true })}
        id="pokerNow_link"
        label="PokerNow Link"
        variant="standard"
        sx={{ marginBottom: 3 }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
