import app from "./app";
import routes from "./routes"
import express from "express";

const app = express()

app.use(express.json())

app.use(routes)

app.listen(3000);
