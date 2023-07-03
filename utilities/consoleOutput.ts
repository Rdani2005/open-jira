import { colorReset } from "./consoleColors";

export function formatLogWithColor(log: string, color: string, type: string) {
    console.log(`- ${color}${type}${colorReset}: ${log}`);
}
