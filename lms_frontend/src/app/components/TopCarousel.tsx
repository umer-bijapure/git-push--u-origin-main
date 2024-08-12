'use client';
import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard from './ServiceCard'
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Link from 'next/link';
type Props = {}

export default function  TopCarousel({}: Props) {
  return (
    <>
        <div className='py-4 relative hidden lg:block'>
            <div className='flex w-full'>
                <Swiper spaceBetween={20} autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                }} slidesPerView={4.5} pagination={{ clickable: true }} modules={[Pagination, Autoplay]} className="mySwiper" color='var(--primaryPink)'>
                    <SwiperSlide><ServiceCard link={'/auth'} name={"Personal Development"} pictureLink={"/personal.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Finance and Accounting"} pictureLink={"/finance.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"IT and Software"} pictureLink={"/coding.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Health and Fitness"} pictureLink={"/health.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Teaching and Academics"} pictureLink={"/classroom.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Banking and Insuarance"} pictureLink={"/banking.png"} key={0} /></SwiperSlide>
                    
                    
                </Swiper>
            </div>
            {/* <div className='absolute top-0 left-[5%] z-[5] mainPageCard p-8 bg-slate-800 w-[70vw] xl:w-[40vw] flex flex-col text-left align-middle justify-center'>
                <h1 className='font-bold text-xl lg:text-6xl text-[color:var(--mainTitleColor)]'>Kuickplan: Where Dreams Meet Reality</h1>
                <p className='my-4 text-lg lg:text-xl'>Kuickplan your way to perfect events, Effortless planning, stress-free experience, Bringing your dream wedding to reality. KuickPlan, your ultimate event planning guide.</p>
                <Link href={"/vendor-services"} className="my-auto mx-auto"><button className='my-4 primaryBtn text-xl xl:text-2xl font-semibold !py-4'>Explore Now</button></Link>
            </div> */}
        </div>
        <div className='py-2 lg:hidden flex flex-col'>
            <div className='flex w-full'>
                <Swiper spaceBetween={20} autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                }} slidesPerView={3} pagination={{ clickable: true }} modules={[Pagination, Autoplay]} className="mySwiper" color='var(--primaryPink)'>
                    <SwiperSlide><ServiceCard link={'/auth'} name={"Personal Development"} pictureLink={"/personal.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Finance and Accounting"} pictureLink={"/finance.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"IT and Software"} pictureLink={"/coding.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Health and Fitness"} pictureLink={"/health.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Teaching and Academics"} pictureLink={"/classroom.png"} key={0} /></SwiperSlide>
                    <SwiperSlide> <ServiceCard link={'/auth'} name={"Banking and Insuarance"} pictureLink={"/banking.png"} key={0} /></SwiperSlide>
                    
                </Swiper>
            </div>
            {/* <div className='mainPageCardSmall p-6 shadow-lg my-6 bg-slate-800 mx-auto w-[90vw] flex flex-col text-left align-middle justify-center'>
                <h1 className='font-bold text-xl lg:text-6xl text-[color:var(--mainTitleColor)]'>Kuickplan: Where Dreams Meet Reality</h1>
                <p className='my-4 text-lg lg:text-xl'>Kuickplan your way to perfect events, Effortless planning, stress-free experience, Bringing your dream wedding to reality. KuickPlan, your ultimate event planning guide.</p>
                <Link href={"/vendor-services"} className="my-auto mx-auto"><button className='my-2 primaryBtn text-xl xl:text-2xl font-semibold !py-2'>Explore Now</button></Link>
            </div> */}
        </div>
    </>
    
  )
}