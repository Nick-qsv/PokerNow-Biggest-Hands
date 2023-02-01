# PokerNow Biggest Hands Organizer

## Overview
This code is a simple website that converts a CSV file of a poker game into a chronological history of the largest pots. The code is written using React.js and makes use of several libraries, including PapaParse and Material-UI.

## Features
- User-friendly interface for uploading and parsing a CSV file.
- Converts the CSV file into a JSON object using Papaparse.
- Sorts the largest betting pots into an array of tuples, with the size of the pot and the index of the entry in the original data.
- Filters the data to display the largest 40 betting pots, along with the chronological history of each hand.
- Color codes the entries based on the type of action (fold, call, raise, win, etc.).

## Usage
1. Upload a CSV file of a poker game to the website: https://biggest-vfm-hands.herokuapp.com/ and view the history of the largest pots from your last game

## Note
This code assumes that the input CSV file follows the specific format offered by the PokerNow website. In case of any issues or for further development, feel free to open an issue or submit a pull request.
