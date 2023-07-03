import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Entry } from "@/models";
import { IEntry } from "@/models";
import { errorColor, formatLogWithColor } from "@/utilities";

type Data =
    | {
          message: string;
      }
    | IEntry
    | IEntry[];

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: "ascending" });
    await db.disconnect();
    res.status(200).json(entries);
};

const addEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = "" } = req.body;
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
        status: "Pending",
    });
    // TODO: Save on DB
    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        return res.status(201).json(newEntry);
    } catch (error) {
        formatLogWithColor(`${error}`, errorColor, "Error");
        await db.disconnect();
        return res.status(400).json({ message: "Data not found" });
    }
};

// Dictionary that maps all available http methods and functions
const handlers: {
    [key: string]: (
        req: NextApiRequest,
        res: NextApiResponse<Data>
    ) => Promise<void>;
} = {
    GET: getEntries,
    POST: addEntries,
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
