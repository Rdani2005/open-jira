import { createContext } from "react";

export interface ContextProps {
    isMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    setIsAdding: (status: boolean) => void;
    startDragging: () => void;
    stopDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
