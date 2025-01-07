import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
       
    }
});

export default store
export type AppDispatch = typeof store.dispatch;
