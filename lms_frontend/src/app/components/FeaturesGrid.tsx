import Image from 'next/image'
import React from 'react'

type Props = {}

export default function FeaturesGrid({}: Props) {
  return (
    <div className='py-6 my-2 mx-auto flex flex-col lg:flex-row align-middle !text-left justify-center w-[90vw] lg:w-[80vw]'>
        <div className='flex-1 my-4 lg:my-0 flex flex-row align-middle justify-start lg:justify-center max-lg:mx-auto max-lg:w-[300px] max-lg:py-2'>
            <img alt='trophy' className='h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[60px] lg:w-[60px] my-auto' src="/assets/homepage/trophy.svg" />
            <div className='ml-4 flex flex-col align-middle justify-center'>
                <h4 className='font-bold text-xl sm:text-2xl lg:text-xl text-[color:var(--titleColor)]'>Best Services</h4>
                <p className='font-semibold text-lg sm:text-xl lg:text-lg text-[color:var(--textColor)]'>Get Best Services Tailored To Your Needs</p>
            </div>
        </div>
        <div className='flex-1 my-4 lg:my-0 flex flex-row align-middle justify-start lg:justify-center max-lg:mx-auto max-lg:w-[300px] max-lg:py-2'>
            <img alt='guarantee' className='h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[60px] lg:w-[60px] my-auto' src="/assets/homepage/vendor.svg"  />
            <div className='ml-4 flex flex-col align-middle justify-center'>
                <h4 className='font-bold text-xl sm:text-2xl lg:text-xl text-[color:var(--titleColor)]'>Best Vendors</h4>
                <p className='font-semibold text-lg sm:text-xl lg:text-lg text-[color:var(--textColor)]'>Find Top Vendors Within Budget</p>
            </div>
        </div>
        <div className='flex-1 my-4 lg:my-0 flex flex-row align-middle justify-start lg:justify-center max-lg:mx-auto max-lg:w-[300px] max-lg:py-2'>
            <img alt='shipping' className='h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[60px] lg:w-[60px] my-auto' src="/assets/homepage/shipping.svg"  />
            <div className='ml-4 flex flex-col align-middle justify-center'>
                <h4 className='font-bold text-xl sm:text-2xl lg:text-xl text-[color:var(--titleColor)]'>Refund Protection</h4>
                <p className='font-semibold text-lg sm:text-xl lg:text-lg text-[color:var(--textColor)]'>For 10 Days</p>
            </div>
        </div> 
    </div>
  )
}