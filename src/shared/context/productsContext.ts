import React from "react";
import { StoreStateType } from "../types/types";

export const StoreContext = React.createContext<StoreStateType | null>(null);
