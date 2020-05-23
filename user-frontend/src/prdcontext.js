import React, { Component } from 'react'
import axios from 'axios'
 import {detailProduct} from './data'

const ProductContext = React.createContext();

class PrdctProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        wishlist: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        const fetchProducts = async () => {
            const res = await axios.get('api/prdcts');
            this.setState({
                ...this.state,
                products: res.data
            })
        };
        fetchProducts();
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item._id === id);
        return product;
    }

    //Open up detail page about a product information
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(
            () => {
                return {detailProduct: product}
            }
        )
        
    }

    //Adds item to cart
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(
            () => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            };
        },
        () => {
            this.addTotal();
        } 
        );
        
    };

    //Adds item to wishlist
    addToWishlist = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inWishlist = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(
            () => {
            return {
                products: tempProducts,
                wishlist: [...this.state.wishlist, product]
            };
        } 
        );
        
    };



    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = id => {
        
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item._id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return { cart: [...tempCart] }
        }, () => {
            this.addTotal()
        })
        
    }

    decrement = id => {

        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item._id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if(product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;

            this.setState(()=>{
                return { cart: [...tempCart] }
            }, () => {
                this.addTotal()
            })
        }

    }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item._id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];

        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotal();
        })
    };

    removeItemFromWishlist = id => {
        let tempProducts = [...this.state.products];
        let tempWishlist = [...this.state.wishlist];

        tempWishlist = tempWishlist.filter(item => item._id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];

        removedProduct.inWishlist = false;
        // removedProduct.count = 0;
        // removedProduct.total = 0;

        this.setState(() => {
            return {
                wishlist: [...tempWishlist],
                products: [...tempProducts]
            }
        })
    };

    clearCart = () => {
        this.setState(() => {
            return { cart: []};
        }, () => {
            const fetchProducts = async () => {
                const res = await axios.get('api/prdcts');
                this.setState({
                    ...this.state,
                    products: res.data
                })
            };
            fetchProducts();
        });
    }

    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax

        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    };

    render() {
        return (
            <ProductContext.Provider 
            value={{
                ...this.state, 
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                addToWishlist: this.addToWishlist,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                removeItemFromWishlist: this.removeItemFromWishlist,
                clearCart: this.clearCart
            }}>
                {/* returns the children within this component */}
                {this.props.children} 
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export  {PrdctProvider, ProductConsumer}
