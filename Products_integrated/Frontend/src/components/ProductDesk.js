import React, {Component} from 'react';
import ProductItem from "./ProductItem";

class ProductDeck extends Component {
    render() {
        const {proDeckArr, onClickDelete} = this.props;
        return (
            <div className="card-deck mt-3">
                {
                    proDeckArr.map( proItem => {
                        return <ProductItem key={proItem._id}
                                            productId={proItem._id}
                                            productName={proItem.productName}
                                            productBrand={proItem.productBrand}
                                            productAverageRating={proItem.product_averageRating}
                                            productDiscount={proItem.product_discount}
                                            productDescription={proItem.productDescription}
                                            dateAdded={proItem.createdDate}
                                            imgSrc={proItem.imgSrc}
                                            onClickDelete={onClickDelete}
                        />
                    })
                }
            </div>
        );
    }
}

export default ProductDeck;