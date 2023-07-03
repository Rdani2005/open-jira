import React, { DragEvent, FC, useContext } from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";

import { Entry } from "@/interfaces";
import { UIContext } from "@/context/ui";
import { useRouter } from "next/router";
import { dateFunctions } from "@/utilities";

interface Props {
    entry: Entry;
}

const EntryCard: FC<Props> = ({ entry }) => {
    const router = useRouter();
    const { startDragging, stopDragging } = useContext(UIContext);

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData("text", entry._id);
        startDragging();
    };

    const onDragEnd = () => {
        stopDragging();
    };

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    };
    return (
        <Card
            sx={{ marginBottom: 1 }}
            // Drag events
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                        {entry.description}
                    </Typography>
                </CardContent>

                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        paddingRight: 2,
                    }}
                >
                    <Typography variant="body2">{`${dateFunctions.formatDistance(
                        entry.createdAt
                    )} ago...`}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default EntryCard;
