import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import { errorColor, formatLogWithColor, infoColor } from "@/utilities";

type Data =
    | {
          message: string;
      }
    | IEntry
    | IEntry[];

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();
    return !entry
        ? res.status(404).json({ message: "Entry to update not found." })
        : res.status(200).json(entry);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(404).json({ message: "Entry to update not found." });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        entryToUpdate.description = description;
        entryToUpdate.status = status;
        formatLogWithColor("Updating entry", infoColor, "Update");
        await entryToUpdate.save();
    } catch (error: any) {
        formatLogWithColor(
            `${error.erros.status.message}`,
            errorColor,
            "Error"
        );
        return res.status(400).json({ message: "Error updating the entry" });
    }
    await db.disconnect();
    return res.status(200).json(entryToUpdate);
};

// Dictionary that maps all available http methods and functions
const handlers: {
    [key: string]: (
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) => Promise<void>;
} = {
    PUT: updateEntry,
    GET: getEntry,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const method = req.method?.toUpperCase();

    // Verify if method is available on dictionary,
    // and returns it or a not found error
    return method && handlers[method]
        ? await handlers[method](req, res)
        : res.status(404).json({ message: "Endpoint not available" });
}
