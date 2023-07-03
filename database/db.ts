import {
    errorColor,
    formatLogWithColor,
    successColor,
    warningColor,
} from "@/utilities";
import mongoose, { Connection } from "mongoose";

interface MongoConnection {
    isConnected: boolean;
}

const mongoConn: MongoConnection = {
    isConnected: false,
};

export const connect = async (): Promise<void> => {
    try {
        if (mongoConn.isConnected) {
            formatLogWithColor(
                "Already connected to DB.",
                warningColor,
                "Warning"
            );
            return;
        }

        await mongoose.connect(process.env.MONGO_URL || "", {});

        mongoConn.isConnected = true;
        formatLogWithColor("Connected to MongoDB", successColor, "Successful");
    } catch (error) {
        formatLogWithColor("Error connecting to MongoDB", errorColor, "Error");
    }
};

export const disconnect = async (): Promise<void> => {
    try {
        if (!mongoConn.isConnected) {
            formatLogWithColor(
                "Already disconnected to DB.",
                warningColor,
                "Warning"
            );
            return;
        }

        await mongoose.disconnect();
        mongoConn.isConnected = false;
        formatLogWithColor(
            "Disconnected to MongoDB",
            successColor,
            "Successful"
        );
    } catch (error) {
        formatLogWithColor(
            "Error disonnecting to MongoDB",
            errorColor,
            "Error"
        );
    }
};
