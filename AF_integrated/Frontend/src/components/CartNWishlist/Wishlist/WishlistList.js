import React from 'react'
import WishlistItem from './WishlistItem'

export default function WishlistList({value}) {

    const {wishlist} = value;

    return (
        <div className="container-fluid">
            {
                wishlist.map(item => {
                    return <WishlistItem key={item._id} item={item} 
                    value={value} />
                })
            }
            
        </div>
    )
}
