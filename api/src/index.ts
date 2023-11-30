import express from "express";
import cors from "cors";
import { notesRouter, userRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/user", userRouter);
app.use("/note", notesRouter);

app.listen(4444, () => console.log("Rodô esse beleléu!"));
