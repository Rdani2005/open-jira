import { UIState } from "./";

export enum UIActionTypes {
    OpenSidebar,
    CloseSidebar,
    ChangeIsAdding,
    StartDragging,
    StopDragging,
}

export const actionHandlers = {
    [UIActionTypes.OpenSidebar]: (state: UIState, payload?: any) => ({
        ...state,
        isMenuOpen: true,
    }),

    [UIActionTypes.CloseSidebar]: (state: UIState, payload?: any) => ({
        ...state,
        isMenuOpen: false,
    }),

    [UIActionTypes.ChangeIsAdding]: (state: UIState, payload: boolean) => ({
        ...state,
        isAdding: payload,
    }),

    [UIActionTypes.StartDragging]: (state: UIState, payload?: any) => ({
        ...state,
        isDragging: true,
    }),
    [UIActionTypes.StopDragging]: (state: UIState, payload?: any) => ({
        ...state,
        isDragging: false,
    }),
};
