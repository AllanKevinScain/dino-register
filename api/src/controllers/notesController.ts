import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getError } from "../helpers";
import { z } from "zod";

const prisma = new PrismaClient();

const createNote = async (req: Request, res: Response) => {
  const schema = z.object({
    id_user: z.number(),
    description: z.string().nonempty({ message: "Campo obrigatório" }).min(3),
  });

  try {
    const body = schema.parse(req.body);
    const create = await prisma.note.create({
      data: {
        description: body.description,
        id_user: body.id_user,
      },
      select: {
        id: true,
      },
    });

    if (create.id) {
      return res.status(200).json({ message: "Nota criada com sucesso!" });
    }
  } catch (e) {
    return getError(e, res);
  }
};

const getNotes = async (_, res: Response) => {
  try {
    const getnote = await prisma.note.findMany();

    if (!getnote) {
      return res.json({ message: "Nenhuma nota encontrada" });
    }

    return res.json(getnote);
  } catch (e) {
    return getError(e, res);
  }
};

const deleteNoteForId = async (req: Request, res: Response) => {
  const schema = z.object({
    id: z.number(),
  });
  try {
    const body = schema.parse(req.body);
    const deleteOnenote = await prisma.note.delete({
      where: {
        id: body.id,
      },
      select: {
        user: true,
      },
    });

    return res.json({
      message: `Nota ${deleteOnenote.user.name} com email ${deleteOnenote.user.email} foi deletado`,
    });
  } catch (e) {
    return getError(e, res);
  }
};

export { createNote, deleteNoteForId, getNotes };
