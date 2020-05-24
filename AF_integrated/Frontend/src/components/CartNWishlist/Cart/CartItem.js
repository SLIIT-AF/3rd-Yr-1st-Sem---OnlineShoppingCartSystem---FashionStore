import React from 'react'

function CartItem({item, value}) {

    const {_id, title, productPic, price, total, count} = item;
    const {increment, decrement, removeItem} = value;

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
                    {/* QUANTITY */}
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>

                        <span className="btn btn-black mx-1"
                        onClick={() => decrement(_id)}>
                            <i className="fa fa-minus" aria-hidden="true"/>
                        </span>

                        <span className="btn btn-black mx-1">
                            {count}
                        </span>

                        <span className="btn btn-black mx-1"
                        onClick={() => increment(_id)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>

                    </div>
                </div>
            </div>

            {/*  */}

            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=> removeItem(_id)}>
                    <i className="fas fa-trash"/>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <strong> item total : $ {total}</strong>
            </div>

        </div>
    )
}

export default CartItem