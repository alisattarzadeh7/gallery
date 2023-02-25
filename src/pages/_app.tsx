import Head from 'next/head'
import {AppProps} from 'next/app'
import React from 'react'
import Layout from "~/components/Layout";
import Providers from "~/src/Utils/Providers";
import 'swiper/css';
import "~/src/assets/styles/globals.scss"

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>

            <Providers>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Providers>
        </>
    )
}
