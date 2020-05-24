import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../../prdcontext';
import PropTypes from 'prop-types';

class Product extends Component {


    render() {

        const {_id, title, productPic, price, inCart, inWishlist} = this.props.product;

        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {value => (
                            <div className="img-container p-5" onClick={() => {
                                value.handleDetail(_id)
                        }}>

                            <Link to="/details">
                                <img src={productPic} alt="product" className="card-img-top" />
                            </Link>

                            {/* Add To Cart Button */}
                            <button className="cart-btn" disabled={inCart ? true : false} 
                            onClick={() => {
                                value.addToCart(_id)
                                value.openModal(_id)
                            }}>

                                {inCart ? 
                                    (<p className="text-capitalize mb-0" disabled> {" "}In cart </p>)
                                    :
                                    (<i className="fas fa-cart-plus"/>)
                                }

                            </button>

                            {/* Wish List Button */}
                            <button className="wishlist-btn" disabled={inWishlist ? true : false} 
                            onClick={() => {
                                value.addToWishlist(_id)
                            }}>

                                {inWishlist ? 
                                    (<p className="text-capitalize mb-0" disabled> {" "}In wishlist </p>)
                                    :
                                    (<i className="fas fa-heart"/>)
                                }

                            </button>

                        </div>
                        )}
                        
                    </ProductConsumer>
                    
                    {/* Card Footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        productPic: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool,
        inWishlist: PropTypes.bool
    }).isRequired
};

export default Product

const ProductWrapper = styled.div`
.card {
    border-color: transparent;
    transition: all .5s linear;
    height: 300px;
}

.card-footer{
    background: transparent;
    border-top: transparent;
    transition: all .5s linear;
}
  
  &:hover{
        .card{
        border: 0.04rem solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2)
        }
        .card-footer{
        background: rgba(247, 247, 247);
        
        }
    }
    .img-container{
      position: relative;
      overflow: hidden;
    }
    .card-img-top{
      transition: all .5s linear;
    }
    .img-container:hover .card-img-top{
      transform: scale(1.2);
    }
    
    .img-container:hover .cart-btn{
      transform: translate(0, 0);
    }
    .cart-btn{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all .25s linear;
      }
      .cart-btn:hover{
        color: var(--mainBlue);
        cursor: pointer;
      }

     .wishlist-btn{
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0.2rem 0.4rem;
        background: #fc03cf;
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0 0.5rem 0 0;
        // transform: translate(-100%, 100%);
        transition: all .25s linear;
     } 
     .wishlist-btn:hover{
        color: var(--mainBlue);
        cursor: pointer;
     }
    
`
