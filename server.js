import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import engines from "consolidate";

import fs from "fs";
import "dotenv/config";
dotenv.config();
import path from 'path';
// const __dirname = path.resolve();
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

import categoryRoutes from "./routes/categoryRoutes.js";

connectDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/api/files", express.static(path.join(__dirname, "/upload")));

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use("/api/categories", categoryRoutes);



const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
