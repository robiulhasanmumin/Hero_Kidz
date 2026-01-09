"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({ href, children }) => {
  const path = usePathname()

  // হোম পেজের জন্য exact match এবং অন্যদের জন্য startsWith চেক করা
  const isActive = href === '/' 
    ? path === '/' 
    : path.startsWith(href);

  return (
    <Link 
      className={`${isActive ? "text-primary font-bold" : "text-gray-600"} font-medium transition-colors`} 
      href={href}
    >
      {children}
    </Link>
  )
}

export default NavLink;