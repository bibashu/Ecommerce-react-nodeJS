import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./products/products_slice";
import { partenaireReducer } from "./partenaire/patenaire_slice";

export const store = configureStore({
    reducer: {
        Products: productReducer,
        Partenaire: partenaireReducer
    }
})