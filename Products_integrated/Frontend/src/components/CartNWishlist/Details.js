import React, { Component } from 'react'
import {ProductConsumer} from '../../prdcontext';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

class Details extends Component {

    render() {
        return (
            <ProductConsumer>
                {
                    value => {
                        
                        const {_id, company, productPic, info, price
                        , title, inCart} = value.detailProduct;
                        // console.log(value.detailProduct);

                    return (
                        <div className="container py-5">
                            {/* Title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center 
                                text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* End Title */}
                            {/* Product Info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={productPic} className="img-fluid"
                                     alt="product"/>
                                </div>
                                {/* Product Text */}
                                <div className="col-10 mx-auto col-md-6 my-3
                                text-capitalize">
                                    <h1>model : {title}</h1>
                                    <h4 className="text-title 
                                    text-uppercase text-muted mt-3 mb-2">
                                        made by : <span className="text-uppercase">
                                            {company}
                                        </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            price : <span>$</span>{price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize
                                    font-weight-bold mt-3 mb-0">
                                        Product Info:
                                    </p>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>
                                    {/* Buttons */}
                                    <div>
                                        <Link to="/prdcts">
                                            <ButtonContainer>back to products</ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart
                                         disabled={inCart ? true : false}
                                            onClick={()=> {
                                                value.addToCart(_id)
                                                value.openModal(_id)
                                            }}
                                        >
                                            {inCart ? "inCart" : "add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                }
            </ProductConsumer>
        )
    }
}

export default Details
