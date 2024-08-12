'use client';
import type { Metadata } from "next";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Inter } from "next/font/google";
import "./globals.css";
import MainNavbar from './components/MainNavbar'
import store from "../../redux/store";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="en">
      

      <body >
      <MainNavbar userId={''} />
        {children}

      </body>
     
    </html>
    </Provider>
  )
}
