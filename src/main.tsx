import React from 'react';
import ReactDOM from 'react-dom/client';

import appRouter from './routes/userRoutes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { Toaster } from 'sonner'
import process from 'process';
import docAppRouter from './routes/adminRouts';


window.process = process;



const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(

   <Provider store={store}>
      <Toaster richColors />
      
      <RouterProvider router={appRouter} />
   </Provider>
);
