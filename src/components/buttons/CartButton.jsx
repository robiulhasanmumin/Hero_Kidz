"use client"
import { handleCart } from '@/actions/server/cart'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import Swal from 'sweetalert2'

const CartButton = ({product}) => {
  const path = usePathname()
  const router = useRouter()
  const session = useSession()
  const isLogin = session?.status == "authenticated";
  const [loading, setLoading] = useState(false)

  const add2Cart = async ()=>{
    setLoading(true)
    if(isLogin) {
      const result = await handleCart(product._id)
      if(result.success){
        Swal.fire("Added To Cart", product?.title, "success")
      } else{
        Swal.fire("Opps", "Something Wrong Happen", "error")

      }
      setLoading(false)
    }
      else{
        router.push(`/login?callbackUrl=${path}`)
        setLoading(false)
      }
  }
  return (
          <button 
            className="btn btn-primary w-full gap-2 group"
            onClick={add2Cart}
            disabled={session.status=="loading" || loading}
          >
            <FaShoppingCart className="group-hover:animate-bounce" />
            Add to Cart
          </button>
  )
}

export default CartButton