const express = require("express");
require("./db/monconnect"); // Corrected the typo in the file name
const MensRanking = require("./models/mens");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(express.json());

app.use(cors());

app.get("/get", async (req, res) => {
  try {
    const getMens = await MensRanking.find({});
    res.status(200).json(getMens); 
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.put("/put/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // Use the correct syntax for the 'new' option
    const updatedMensRanking = await MensRanking.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );

    // Send the updated MensRanking object as the response
    res.status(200).json(updatedMensRanking);
  } catch (e) {
    // Use status code 500 for internal server error
    res.status(500).send(e.message);
  }
});



app.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // Use the correct method for deletion
    const deletedMensRanking = await MensRanking.findByIdAndDelete(_id);

    // Check if the document was found and deleted successfully
    if (deletedMensRanking) {
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (e) {
    // Use status code 500 for internal server error
    res.status(500).send(e.message);
  }
});




app.post("/mens", async (req, res) => {
  try {
    // Use the 'new' keyword to create a new instance of MensRanking
    const newMensRanking = new MensRanking(req.body);
      console.log(req.body);
    // Save the new instance to the database
    const savedMensRanking = await newMensRanking.save();

    res.status(201).json(savedMensRanking);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
