import { UIState, actionHandlers, UIActionTypes } from "./";

type UIActionType = { type: UIActionTypes; payload?: any };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    return actionHandlers[action.type]
        ? actionHandlers[action.type](state, action.payload)
        : state;
};
