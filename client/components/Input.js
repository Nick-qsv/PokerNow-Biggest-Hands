import React, { ChangeEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// import { useForm } from "react-hook-form";

export const Input = () => {
  const [filename, setFilename] = useState("");

  const handleFileUpload = () => {
    const file = document.getElementById("uploadFile").files[0];
    const { name } = file;
    setFilename(name);
  };

  const uploadConfirm = () => {
    Papa.parse(document.getElementById("uploadFile").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results);
        for (let i = 0; i < results.data.length; i++) {
          results.data[i].entry;
        }
      },
    });
  };

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
      component="div"
      key={1}
    >
      <Box component="h2" sx={{ fontFamily: "verdana" }}>
        Upload your PokerNow CSV to see the Biggest Hands!
      </Box>
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
      >
        Upload File
        <input
          type="file"
          id="uploadFile"
          accept=".csv"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      <Box sx={{ marginTop: 1, fontFamily: "verdana" }}>{filename}</Box>
      {/* <input type="file" id="uploadFile" accept=".csv" /> */}
      <Button
        id="uploadConfirm"
        variant="contained"
        color="success"
        sx={{ marginTop: 2 }}
        onClick={uploadConfirm}
      >
        See the Biggest Hands!
      </Button>
    </Box>
  );
};
