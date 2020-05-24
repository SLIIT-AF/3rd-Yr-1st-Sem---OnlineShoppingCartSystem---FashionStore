import React, { Component } from 'react';
import {ProductConsumer} from '../../../prdcontext';
import Title from '../Title';
import EmptyWishlist from './EmptyWishlist';
import WishlistColumn from './WishlistColumn';
import WishlistList from './WishlistList';

class Wishlist extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {
                            value => {
                                const {wishlist} = value;
                                if(wishlist.length > 0) {
                                    return (
                                        <React.Fragment>
                                            <Title name="your " title="wishlist"/>
                                            <WishlistColumn/>
                                            <WishlistList value={value}/>
                                        </React.Fragment>
                                    );
                                }
                                else {
                                    return <EmptyWishlist/>
                                }
                            }
                    }
                </ProductConsumer>
            </section>
        )
    }
}

export default Wishlist
