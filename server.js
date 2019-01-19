const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/serverConfig");
mongoose.connect(`mongodb://localhost/${config.DB_NAME}`, {
  useNewUrlParser: true
});

const itemApi = require("./routes/api/item");

const PORT = process.env.PORT || config.PORT;

app.use(bodyParser.json());

app.use("/api/items", itemApi);

//Serve static asets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, err => {
  if (err) {
    console.log(`Server Error ${err}`);
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});
