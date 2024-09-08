import { createSlice } from "@reduxjs/toolkit";
import { useSyncExternalStore } from 'react';

export const partenaireSlice = createSlice({
    name: "partenaireSlice",
    initialState: {
        partenaireList: [],
        
    }, 
    reducers: {
        setPartenaireList: (currentSlice, action) => {
            currentSlice.partenaireList = action.payload;
          },
        //   setFilteredProduct: (currentSlice, action) =>{
        //     currentSlice.filteredProduct = action.payload
        //   }
        }
    })
    // console.log(setProductList);

export const partenaireReducer = partenaireSlice.reducer;
export const { setPartenaireList } = partenaireSlice.actions;
