import { Entry } from "@/interfaces";
import { EntriesState } from "./";

export enum EntriesActionTypes {
    AddEntry,
    UpdateEntry,
    RefreshData,
}

export const actionHandlers = {
    [EntriesActionTypes.AddEntry]: (state: EntriesState, payload: Entry) => ({
        ...state,
        entries: [...state.entries, payload],
    }),

    [EntriesActionTypes.UpdateEntry]: (
        state: EntriesState,
        payload: Entry
    ) => ({
        ...state,
        entries: state.entries.map((entry) =>
            entry._id === payload._id ? payload : entry
        ),
    }),
    [EntriesActionTypes.RefreshData]: (
        state: EntriesState,
        payload: Entry[]
    ) => ({
        ...state,
        entries: [...payload],
    }),
};
