import { Router } from "express";
import { createNote, getNotes, deleteNoteForId } from "../controllers";

const notesRouter = Router();

notesRouter.post("/create", createNote);
notesRouter.get("/get-all", getNotes);
notesRouter.delete("/delete", deleteNoteForId);

export { notesRouter };
