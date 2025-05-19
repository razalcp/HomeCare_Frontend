import React from 'react';
import ReactDOM from 'react-dom/client';

import appRouter from './routes/userRoutes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Toaster } from 'sonner'
import process from 'process';
// import docAppRouter from './routes/adminRouts';
import appStore from './Redux/appStore'
import StripeProvider from './helpers/StripeProvider';
import { SocketProvider } from './context/socketContext';


window.process = process;



const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(

   <Provider store={appStore}>
      <StripeProvider>

         <Toaster richColors />
         <SocketProvider>   
         <RouterProvider router={appRouter} />
         </SocketProvider>
         
      </StripeProvider>
   </Provider>

);
