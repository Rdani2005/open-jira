import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import { AddCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Button, Box, TextField } from "@mui/material";
import React, { ChangeEvent, useContext, useState } from "react";

export const NewEntry = () => {
    const [inputValue, setinputValue] = useState<string>("");

    const [touched, settouched] = useState<boolean>(false);

    const { addNewEntry } = useContext(EntriesContext);
    const { isAdding, setIsAdding } = useContext(UIContext);

    const onTextFliendChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setinputValue(event.target.value);
    };

    const save = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setIsAdding(false);
        settouched(false);
    };

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>
            {isAdding ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder="New Entry"
                        autoFocus
                        multiline
                        label="New Entry"
                        helperText={
                            inputValue.length <= 0 &&
                            touched &&
                            "Add a new value"
                        }
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFliendChanged}
                        onBlur={() => settouched(true)}
                    />
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setIsAdding(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<SaveOutlined />}
                            onClick={save}
                        >
                            Save
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddCircleOutline />}
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsAdding(true)}
                >
                    Add Task
                </Button>
            )}
        </Box>
    );
};
