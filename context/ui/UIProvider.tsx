import { FC, useReducer } from "react";
import { UIActionTypes, UIContext, uiReducer } from "./";

export interface UIState {
    isMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
    isAdding: false,
    isDragging: false,
};

type Props = {
    children?: React.ReactNode;
};

export const UIProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openMenu = () => {
        dispatch({ type: UIActionTypes.OpenSidebar });
    };

    const closeMenu = () => {
        dispatch({ type: UIActionTypes.CloseSidebar });
    };

    const setIsAdding = (isAdding: boolean) => {
        dispatch({ type: UIActionTypes.ChangeIsAdding, payload: isAdding });
    };

    const startDragging = () => {
        dispatch({ type: UIActionTypes.StartDragging });
    };

    const stopDragging = () => {
        dispatch({ type: UIActionTypes.StopDragging });
    };

    return (
        <UIContext.Provider
            value={{
                ...state,
                // Functions
                openMenu,
                closeMenu,
                setIsAdding,
                startDragging,
                stopDragging,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
