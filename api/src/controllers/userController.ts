import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getError } from "../helpers";
import { z } from "zod";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const schema = z.object({
    email: z
      .string()
      .nonempty({ message: "Campo obrigatório" })
      .email({ message: "Email inválido" })
      .min(3),
    name: z.string().nonempty({ message: "Campo obrigatório" }).min(3),
  });

  try {
    const body = schema.parse(req.body);
    const create = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
      select: {
        id: true,
      },
    });

    if (create.id) {
      return res.status(200).json({ message: "Usuário criado com sucesso!" });
    }
  } catch (e) {
    return getError(e, res);
  }
};

const getUsers = async (_, res: Response) => {
  try {
    const getUser = await prisma.user.findMany();

    if (!getUser) {
      return res.json({ message: "Nenhum usuário encontrado" });
    }

    return res.json(getUser);
  } catch (e) {
    return getError(e, res);
  }
};

const deleteUserForId = async (req: Request, res: Response) => {
  const schema = z.object({
    id: z.number(),
  });
  try {
    const body = schema.parse(req.body);
    const deleteOneUser = await prisma.user.delete({
      where: {
        id: body.id,
      },
      select: {
        email: true,
        name: true,
      },
    });

    return res.json({
      message: `Usuário ${deleteOneUser.name} com email ${deleteOneUser.email} foi deletado`,
    });
  } catch (e) {
    return getError(e, res);
  }
};

export { createUser, deleteUserForId, getUsers };
