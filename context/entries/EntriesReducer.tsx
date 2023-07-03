import { Entry } from "@/interfaces";
import { EntriesState, actionHandlers, EntriesActionTypes } from "./";

type EntriesActionType = { type: EntriesActionTypes; payload: any };

export const EntriesReducer = (
    state: EntriesState,
    action: EntriesActionType
): EntriesState => {
    return actionHandlers[action.type]
        ? actionHandlers[action.type](state, action.payload)
        : state;
};
