import { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "@/database";
import { Entry } from "@/models";

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (process.env.NODE_ENV === "production") {
        return res
            .status(401)
            .json({ message: "Access to this service not allowed" });
    }

    await db.connect();
    await Entry.deleteMany();
    await Entry.insertMany(seedData.entries);
    await db.disconnect();

    return res.status(200).json({ message: "Process done successfully" });
}
