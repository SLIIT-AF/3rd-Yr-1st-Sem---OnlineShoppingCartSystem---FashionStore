import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import axios from 'axios';
import {ProductConsumer} from '../../prdcontext'

class ProductList extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our " title="Products" />
                        <div className="row">
                            <ProductConsumer>
                                {
                                    (value) => {
                                        return value.products.map(product => {
                                            return <Product key={product._id} product={product} />
                                        })
                                    }
                                }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductList
