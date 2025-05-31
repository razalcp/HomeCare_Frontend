import React from 'react';
import ReactDOM from 'react-dom/client';

import appRouter from './routes/userRoutes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Toaster } from 'sonner'
import process from 'process';
import appStore from './Redux/appStore'
import StripeProvider from './helpers/StripeProvider';
import { SocketProvider } from './context/socketContext';
import Notiflix from 'notiflix';


window.process = process;

//Configure Notiflix globally before rendering
Notiflix.Notify.init({
   closeButton: true,
   timeout: 1000,
   showOnlyTheLastOne: true,
   position: 'center-top', // optional: change as needed
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(

   <Provider store={appStore}>
      <StripeProvider>

         <Toaster richColors closeButton />
         <SocketProvider>
            <RouterProvider router={appRouter} />
         </SocketProvider>

      </StripeProvider>
   </Provider>

);
