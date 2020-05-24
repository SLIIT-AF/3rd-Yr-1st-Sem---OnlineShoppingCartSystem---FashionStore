import React from 'react'
import {ButtonContainer} from '../Button';

export default function WishlistItem({item, value}) {

    const {_id, title, productPic, price, inCart} = item;
    const {removeItemFromWishlist, addToCart} = value;


    return (
        <div className="row my-2 text-capitalize text-center">

            <div className="col-10 mx-auto col-lg-2">
                <img src={productPic} style={{width: '5rem', height: '5rem'}}
                    className="img-fluid" alt="product"
                />
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>
                {price}
            </div> 

            {/* REMOVE ITEM */}

            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=> removeItemFromWishlist(_id)}>
                    <i className="fas fa-trash"/>
                </div>
            </div>

            {/* ADD ITEM TO CART */}

            {/* <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=> addToCart(_id)}>
                    <i className="fas fa-plus"/>
                </div>
            </div> */}

            <div className="col-10 mx-auto col-lg-2">
                <ButtonContainer cart
                    disabled={inCart ? true : false}
                    onClick={()=> { addToCart(_id)}}>
                    {inCart ? "inCart" : "add to cart"}
                </ButtonContainer>
            </div>

        </div>
    )
}
