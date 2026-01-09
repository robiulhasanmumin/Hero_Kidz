import Image from 'next/image'
import React from 'react'
import img from "../../../public/assets/hero.png"
import { fontBangla } from '@/app/layout'

const Banner = () => {
  return (
    <div className='flex justify-between items-center gap-20 px-20'>
      <div className='flex-1 space-y-5'>
        <h1 className={`text-6xl font-bold ${fontBangla.className} leading-20`}>আপনার শিশুকে দিন একটি <span className='text-primary'>সুন্দর ভবিষ্যৎ</span> </h1>
        <p>Buy Every toy with up to 15% Discount</p>
        <button className='btn btn-primary btn-outline'>Explore Products</button>
      </div>
      <div className='flex-1'>
         <Image width={500} height={400} src={img} alt='hero img'></Image>
      </div>
    </div>
  )
}

export default Banner