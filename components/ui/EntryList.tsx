import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import EntryCard from "./EntryCard";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

import styles from "./EntryList.module.css";

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, stopDragging } = useContext(UIContext);

    const statusEntries = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries]
    );

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData("text");
        const entry = entries.find((e) => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        stopDragging();
    };

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ""}
        >
            <Paper
                sx={{
                    height: "calc(100vh - 250px)",
                    overflowY: "scroll",
                    backgroundColor: "transparent",
                    padding: "1px 5px",
                }}
            >
                <List
                    sx={{
                        opacity: isDragging ? 0.2 : 1,
                        transition: "all .3s",
                    }}
                >
                    {statusEntries.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
