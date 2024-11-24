const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Timestamp Microservice! Use '/api/:date?' endpoint.",
  });
});

// Timestamp endpoint
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;
  // Handle no parameter (return current date)
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if it's a valid Unix timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Timestamp Microservice running at http://localhost:${port}`);
});
