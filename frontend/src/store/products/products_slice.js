import { createSlice } from "@reduxjs/toolkit";
import { useSyncExternalStore } from 'react';

export const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        productList: [],
        filteredProduct: []
    }, 
    reducers: {
        setProductList: (currentSlice, action) => {
            currentSlice.productList = action.payload;
          },
          setFilteredProduct: (currentSlice, action) =>{
            currentSlice.filteredProduct = action.payload
          }
        }
    })
    // console.log(setProductList);

export const productReducer = productSlice.reducer;
export const { setProductList, setFilteredProduct } = productSlice.actions;
