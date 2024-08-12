import React from 'react'
import { servicesOffered } from './utils'
import Link from 'next/link';
import ServiceCard from './ServiceCard';

type Props = {}



export default function ServicesGrid({}: Props) {
  return (
    <div className='w-full my-10 flex flex-col'>
        <h2 className='text-2xl xl:text-3xl font-semibold text-[color:var(--mainTitleColor)] text-center'>Your Complete Event Planner</h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 my-6 w-[90vw] lg:w-[70vw] mx-auto'>
            {servicesOffered.filter((e, i)=>{
                if(i < 6){
                    return true;
                }
                return false;
            }).map((e, i)=><ServiceCard link={e.link} name={e.name} pictureLink={e.pictureLink} key={i} />)}
        </div>
        <Link href={"/auth"}><button className='w-fit mx-auto transition-colors hover:bg-[color:var(--textColor)] hover:text-[#C4D559] px-4 py-2 border-white hover:border-[#C4D559] border-[1px] text-white font-semibold'>Explore all Courses</button></Link>
    </div>
  )
}
