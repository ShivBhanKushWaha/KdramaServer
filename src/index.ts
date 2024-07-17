import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "Hello from server" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});