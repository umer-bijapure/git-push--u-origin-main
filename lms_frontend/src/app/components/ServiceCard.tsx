import Link from 'next/link'
import React from 'react'

type Props = {
    name: string,
    link: string,
    pictureLink: string
}

export default function ServiceCard(e: Props) {
  return (
    <Link href={`${e.link}`}>
        <div className='mx-2 xl:mx-4 my-4 lg:my-6 relative text-white hover:text-[#C4D559] p-2 hover:ring-2 hover:ring-[#C4D559] rounded-lg'>
            <img src={e.pictureLink} alt={e.name} className="w-full cursor-pointer hover:ring-2 hover:ring-[#C4D559]" />
            <div className='top-0 absolute w-full h-full serviceGridCard z-[1]'><p className='invisible'>{e.name}</p></div>
            <p className='z-[2] font-semibold text-md sm:text-xl '>{e.name}</p>
        </div>
    </Link>
  )
}