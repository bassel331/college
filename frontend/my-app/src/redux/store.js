import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginReducer.js';
export default configureStore({
    reducer: {
        login: loginSlice,
                        
    },
    devTools:true,
});
