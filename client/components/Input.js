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
    Papa.parse(document.getElementById("uploadFile").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results);

        for (let i = 0; i < results.data.length; i++) {
          const entry = results.data[i].entry;
          const regex = /\d+/;
          if (entry.includes("collected") && entry.includes("second run")) {
            console.log("THIS IS DOUBLE ENTRY", entry);
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
          //if it has collect log the index and push it into a new object
          /*[{
            size: 12.00
            index: 16 (i)
          }]*/
          //organize the object by size using sort
          //handSizeArray.sort((a,b) => b.size - a.size);
          //now that we have a sorted array, we need to pull together the top 5 hands to start
          //so a for loop from 0 - 4, grab the index from each entry
          //lets do the above then worry about the rest
        }
        sortedHandSize = handSizeArray.sort((a, b) => b.size - a.size);
        //now we have the top 10 hands and the index of each
        //time to use that index to make a new object, i hop
        //now we need to render this on the page.  can be a simple box render
        //how do we get it out of this thing?
        for (let j = 0; j < 25; j++) {
          //can do a while loop
          const listDiv = document.getElementById("handsDiv");
          const divider = document.createElement("hr");
          const handNumber = document.createElement("h2");
          divider.classList.add("hr.dotted");
          handNumber.innerHTML = `Hand #${j + 1}`;
          listDiv.appendChild(handNumber);
          let num = sortedHandSize[j].index;
          while (!results.data[num].entry.includes("starting hand")) {
            let entry = results.data[num].entry;
            if (entry.includes("@") && !entry.includes("Player stacks:")) {
              let startRemove = entry.indexOf("@") - 1;
              let endRemove = startRemove + 13;
              entry = entry.substr(0, startRemove) + entry.substr(endRemove);
            }
            let entryDiv = document.createElement("div");
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
