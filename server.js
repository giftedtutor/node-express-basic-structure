import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import engines from "consolidate";
import "dotenv/config";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");


connectDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
// app.set("view engine", "ejs");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use("/api/posts", postRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
