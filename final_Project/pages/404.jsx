import React from 'react'
import Image from 'next/image'
import nFound from '../public/images/404.svg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
const NotFound = () => {
    const router = useRouter()
    return (
        <div className='justify-items-center mt-20'>
            <Head>
                <title>
                    Page Not Found | Softsaro
                </title>
            </Head>
            <div className="text-center pt-10 text-5xl mb-0 leading-0 text-primary">Oops!</div>
            <div className="text-center pt-5 text-2xl mt-0">You are lost in space</div>
            <Image className='mx-auto' src={nFound} height={100} width={700} alt="lost"></Image>
            <p className='text-center text-grey mt-2 text-sm'>The page you are looking for cannot be found. Please return back.</p>
            <div className="text-center mt-4">
                <button onClick={() => { router.back() }} className='bg-primary text-white px-4 py-2 hover:bg-blue-600 rounded mx-auto flex items-center'>
                    <span className="material-symbols-outlined mr-2 text-lg">
                        arrow_back
                    </span>
                    <span>
                        <Link href='/'>
                            Return to Home Page
                        </Link>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default NotFound