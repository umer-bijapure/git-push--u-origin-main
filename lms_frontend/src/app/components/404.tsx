import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBack } from "react-icons/io5"

const FourOhFour: NextPage = () => {
  return (
    <div className='w-full h-screen flex flex-col align-middle justify-center'>
        <div className='mx-auto my-auto flex flex-col align-middle justify-center'>
            <Image alt='404 asset' src={"/assets/vectors/404.svg"} width={372.8} height={243.2} className="mx-auto mb-10 px-4" ></Image>
            <h2 className='text-[color:var(--titleColor)] font-bold text-center text-4xl mb-2' >Page not found</h2>
            <p className='text-[color:var(--textColor)] font-normal text-center text-xl mb-6' >Sorry, it looks like the page you&apos;re looking for does not exist.</p>
            <Link href={"/"} className="mx-auto" ><button className='secondaryBtn flex flex-row align-middle justify-center'><IoArrowBack className='my-auto mr-2' /> <p>Home</p></button></Link>
        </div>
    </div>
  )
}

export default FourOhFour;
