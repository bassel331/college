import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from "./loginReducer.js"; // ✅ Named import (not default)
export const store =configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer, // ✅ Add RTK Query reducer
                        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginSlice.middleware), // ✅ Ensure middleware is correctly used     
    devTools:true,
});

