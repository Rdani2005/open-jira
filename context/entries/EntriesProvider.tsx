import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { EntriesActionTypes, EntriesContext, EntriesReducer } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from "@/apis";

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

type Props = {
    children?: React.ReactNode;
};

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>("/entries", {
                description,
            });

            dispatch({ payload: data, type: EntriesActionTypes.AddEntry });
        } catch {
            console.log("Error Adding the new Task.");
        }
    };

    const updateEntry = async ({ _id, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });
            dispatch({ type: EntriesActionTypes.UpdateEntry, payload: data });
            // Snack notification
            enqueueSnackbar("Entry Updated", {
                variant: "success",
                autoHideDuration: 1500,
                anchorOrigin: {
                    horizontal: "right",
                    vertical: "top",
                },
            });
        } catch (error) {
            console.log("Error updating the task.");
        }
    };

    const refreshEntries = async () => {
        try {
            const { data } = await entriesApi.get<Entry[]>("/entries");
            dispatch({ type: EntriesActionTypes.RefreshData, payload: data });
        } catch {
            console.log("Error refreshing the entries");
        }
    };

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider
            value={{
                ...state,

                // methods
                addNewEntry,
                updateEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
