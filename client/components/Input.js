import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const Input = () => {
  const [filename, setFilename] = useState("");

  const handleFileUpload = () => {
    const file = document.getElementById("uploadFile").files[0];
    const { name } = file;
    setFilename(name);
  };

  const uploadConfirm = () => {
    let handSizeArray = [];
    let sortedHandSize = [];

    //Papaparse converts the CSV into JSON
    Papa.parse(document.getElementById("uploadFile").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        //Create an array of tuples of the largest hands
        for (let i = 0; i < results.data.length; i++) {
          const entry = results.data[i].entry;
          const regex = /\d+/;
          //Check if they ran it twice
          if (entry.includes("collected") && entry.includes("second run")) {
            let handTuple = {
              size: 0,
              index: 0,
            };
            let startIndex = entry.indexOf("collected") + 9;
            let subString = entry.slice(startIndex, startIndex + 11);
            let total = parseInt(subString.match(regex)[0]) * 2;
            handTuple.size = total;
            handTuple.index = i;
            handSizeArray.push(handTuple);
            i++;
            //If they only ran it once, then use this
          } else if (entry.includes("collected")) {
            let handTuple2 = {
              size: 0,
              index: 0,
            };
            let startIndex = entry.indexOf("collected") + 9;
            let subString = entry.slice(startIndex, startIndex + 11);
            let total = parseInt(subString.match(regex)[0]);
            handTuple2.size = total;
            handTuple2.index = i;
            handSizeArray.push(handTuple2);
          }
        }
        //Sort the array of Tuples
        sortedHandSize = handSizeArray.sort((a, b) => b.size - a.size);

        //Use the tuple array to quickly filter through the data
        //Can change the value below to show more or less hands
        for (let j = 0; j < 25; j++) {
          //Create the HTML elements that are going to be added
          const listDiv = document.getElementById("handsDiv");
          const divider = document.createElement("hr");
          const handNumber = document.createElement("h2");
          divider.classList.add("hr.dotted");
          handNumber.innerHTML = `Hand #${j + 1}`;
          listDiv.appendChild(handNumber);
          //Find the index of the Biggest Hand
          let num = sortedHandSize[j].index;
          //Loop through the data until you get to "Starting Hand", which indicates the hand is over
          while (!results.data[num].entry.includes("starting hand")) {
            //Append each entry as a Div to the bottom of the page
            let entry = results.data[num].entry;
            //Remove annoying @ blah stuff from the entry
            if (entry.includes("@") && !entry.includes("Player stacks:")) {
              let startRemove = entry.indexOf("@") - 1;
              let endRemove = startRemove + 13;
              entry = entry.substr(0, startRemove) + entry.substr(endRemove);
            }
            let entryDiv = document.createElement("div");
            //Check for the type of action to color code it
            if (entry.includes("fold")) {
              entryDiv.classList.add("fold");
            } else if (entry.includes("raises")) {
              entryDiv.classList.add("callRaise");
            } else if (entry.includes("calls")) {
              entryDiv.classList.add("call");
            } else if (entry.includes("collect")) {
              entryDiv.classList.add("win");
            } else if (entry.includes("bets")) {
              entryDiv.classList.add("bet");
            } else {
              entryDiv.classList.add("entry");
            }
            entryDiv.innerHTML = entry;
            listDiv.appendChild(entryDiv);
            num++;
          }
          listDiv.appendChild(divider);
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
      id="inputDiv"
    >
      <Box component="h2" sx={{ fontFamily: "verdana" }}>
        Upload your PokerNow Full Log to see the Biggest Hands!
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
      <Button
        id="uploadConfirm"
        variant="contained"
        color="success"
        sx={{ marginTop: 2 }}
        onClick={uploadConfirm}
      >
        See the Biggest Hands!
      </Button>
      <Box id="handsDiv" component="div" sx={{ marginTop: 3 }}></Box>
    </Box>
  );
};
