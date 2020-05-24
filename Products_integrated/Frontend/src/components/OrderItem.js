import React, {Component} from 'react';
import {AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel} from "react-accessible-accordion";

class OrderItem extends Component {
    render() {
        let { id, orderType, orderDescription, partyName, orderProductName, orderProductCategory, productUnitPrice,
            orderQuantity, orderDiscount,orderTotalPayment, orderPaymentStatus, orderPlacementDate, onClickDelete, onUpdateValues,
            onClickUpdateAPICAll} = this.props;
        orderPlacementDate = new Date(orderPlacementDate).toLocaleString();
        return (
            <div>
                <AccordionItem>
                    <AccordionItemHeading className="AccordionItem">
                        <AccordionItemButton>
                            <span>
                                {orderProductName}
                            </span>
                            <button className="editIcon text-success">
                                <i className="fas fa-pen" onClick={() => {onClickUpdateAPICAll(id)}}> Submit edit</i>
                            </button>
                            <span className="deleteIcon text-danger">
                                <i className="fas fa-trash" onClick={() => onClickDelete(id)} />
                            </span>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            <b>orderType : </b> {orderType}
                        </p>
                        <p>
                            <b>Supplier / Customer name  : </b> <input type="text" value={partyName} name="partyName"
                                                                       onChange={(e) => onUpdateValues(id, e.target.value)} />
                        </p>
                        <p>
                            <b> Product Category : </b> {orderProductCategory}
                        </p>
                        <p>
                            <b> Unit price : </b> <input name="productUnitPrice" type="text" value={productUnitPrice}
                                                         onChange={(e) => onUpdateValues(id, e.target.name, e.target.value)} />
                        </p>
                        <p>
                            <b> Ordered quantity : </b> <input type="text" name="order_quantity" value={orderQuantity} onChange={(e) => onUpdateValues(id, e.target.name, e.target.value)} />
                        </p>
                        <p>
                            <b> Discount allowed : </b> <input name="order_discount" type="text" value={orderDiscount}
                                                               onChange={(e) => onUpdateValues(id, e.target.name, e.target.value)} />
                        </p>
                        <p>
                            <b> Order total payment : </b> {orderTotalPayment}
                        </p>
                        <p>
                            <b> Order payment status : </b> {orderPaymentStatus}
                        </p>
                        <p>
                            <b> Order description : </b> <input name="order_description" type="text" value={orderDescription}
                                                                onChange={(e) => onUpdateValues(id, e.target.name, e.target.value)} />
                        </p>
                        <p>
                            <b> Order placement date : </b> {orderPlacementDate}
                        </p>

                    </AccordionItemPanel>
                </AccordionItem>
            </div>
        );
    }
}

export default OrderItem;