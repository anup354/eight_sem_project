import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { useRouter } from "next/router";

import { AuthProvider } from "../components/context/AuthProvider";
import PageLoader from "../components/loader/pageLoader";
import Navbar from "../components/frontlayout/navbar";
import Footer from "../components/frontlayout/footer";

import RequireAuth from "../components/AuthGuard/RequireAuth";
import Layout from "../components/layouts/layout";
export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requiredAuth?: boolean;
  noHeader?: boolean; // Add this property to indicate no header
  noFooter?: boolean; // Add this property to indicate no footer
};
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const shouldDisplayHeader = !Component.noHeader;
  const shouldDisplayFooter = !Component.noFooter;

  return (
    <>
      {loading && <PageLoader />}

      <AuthProvider>
        {Component.requiredAuth ? (
          <>
            <RequireAuth>
              <div className="max-md:pt-0 max-lg:pt-0 max-sm:pt-0 max-w-screen-3xl mx-auto">
                <Layout>
                  <Component {...pageProps} className="max-lg:mt-5" />
                </Layout>
              </div>
            </RequireAuth>
          </>
        ) : (
          <>
            {shouldDisplayHeader && <Navbar />}
            <Component {...pageProps} />
            {shouldDisplayFooter && <Footer />}
          </>
        )}
      </AuthProvider>
    </>
  );
}
