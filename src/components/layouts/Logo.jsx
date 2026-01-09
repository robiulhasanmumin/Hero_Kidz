import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../../../public/assets/logo.png"

const Logo = () => {
  return (
    <Link href={"/"} className='flex items-center gap-2'>
      <Image height={50} width={50} src={logo} alt='kidz logo'/>
      <h2 className='text-xl font-bold'>Hero <span className='text-primary'>Kidz</span></h2>
    </Link>
  )
}

export default Logo