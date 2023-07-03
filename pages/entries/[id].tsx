import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import {
    capitalize,
    Grid,
    CardHeader,
    CardContent,
    TextField,
    CardActions,
    Button,
    Card,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { Layout } from "@/layouts";
import { SaveOutlined, DeleteOutline } from "@mui/icons-material";
import { Entry, EntryStatus } from "@/interfaces";
import { IconButton } from "@mui/material";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utilities";

interface props {
    entry: Entry;
}

const validStatus: EntryStatus[] = ["Pending", "in-progress", "finished"];

const Entry: FC<props> = ({ entry }) => {
    const [inputValue, setInputValue] = useState<string>(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState<boolean>(false);

    const { updateEntry } = useContext(EntriesContext);

    const onTextFliendChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    };

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            description: inputValue,
            status,
        };

        updateEntry(updatedEntry);
    };

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched]
    );
    return (
        <Layout title={`${inputValue.substring(0, 20)} | OpenJira`}>
            <Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entry: ${inputValue}`}
                            subheader={`Created ${dateFunctions.formatDistance(
                                entry.createdAt
                            )} ago...`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="New Entry"
                                autoFocus
                                multiline
                                label="Update entry"
                                value={inputValue}
                                onChange={onTextFliendChanged}
                                helperText={isNotValid && "Add a new value"}
                                error={isNotValid}
                                onBlur={() => setTouched(true)}
                            />
                            <FormControl>
                                <FormLabel>Status:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {validStatus.map((option) => (
                                        <FormControlLabel
                                            label={capitalize(option)}
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {/* Radio */}
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                sx={{
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    backgroundColor: "text.secondary",
                }}
            >
                <DeleteOutline></DeleteOutline>
            </IconButton>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    return {
        props: {
            entry,
        },
    };
};

export default Entry;
