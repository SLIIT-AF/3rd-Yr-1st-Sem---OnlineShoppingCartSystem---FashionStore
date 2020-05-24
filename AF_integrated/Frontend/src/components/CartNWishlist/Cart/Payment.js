import React, { Component } from 'react'
import {ProductConsumer} from '../../../prdcontext'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Payment extends Component {

    state = {
        modal: false,
        firstName: '',
        lastName: '',
        address: '',
        contactNo: '',
        city: '',
        province: '',
        zip: ''

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({
            firstName: '',
            lastName: '',
            address: '',
            contactNo: '',
            city: '',
            province: '',
            zip: '',
        })

    }

    render() {

        return (
            <section>
                <ProductConsumer>

                    {
                        value => {
                            const {cartTotal} = value;
                            return (

                                <div className="container col-md-8 col-md-offset-8">
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-md-4 order-md-2 mb-4">
                                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">Your Total</span>
                                        </h4>
                                        <ul className="list-group mb-3">

                                            <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (USD)</span>
                                            <strong>{cartTotal}</strong>
                                            </li>
                                        </ul>
                                        
                                        </div>
                                    </div>

                                    <Form onSubmit={this.onSubmit}>
                                        <Row form md={6}>
                                            <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstName">First name</Label>
                                                <Input type="text"  name="firstName" 
                                                onChange={this.onChange} />
                                            </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastName">Last name</Label>
                                                <Input type="text"  name="lastName"
                                                onChange={this.onChange} />
                                            </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="address">Address</Label>
                                            <Input type="text" name="address"
                                            onChange={this.onChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="contactNo">Contact No</Label>
                                            <Input type="text"  name="contactNo"
                                            onChange={this.onChange}/>
                                        </FormGroup>
                                        <Row form>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for="city">City</Label>
                                                <Input type="text"  name="city"
                                                onChange={this.onChange}/>
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for="province">Province</Label>
                                                <Input type="text" name="province"
                                                onChange={this.onChange}/>
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for="zip">Zip</Label>
                                                <Input type="text" name="zip"
                                                onChange={this.onChange}/>
                                            </FormGroup>  
                                            </Col>
                                        </Row>

                                        <hr className="mb-4"/>

                                        <FormGroup tag="fieldset" row>
                                            <legend className="col-form-label col-sm-2 font-weight-bold">
                                                Payment Type
                                            </legend>
                                            <Col sm={10}>
                                            <FormGroup check>
                                                <Label check>
                                                <Input type="radio" name="paymentType" />{' '}
                                                    Paypal
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                <Input type="radio" name="paymentType" />{' '}
                                                    Cash on Delivery
                                                </Label>
                                            </FormGroup>
                                            </Col>
                                        </FormGroup>

                                        <Button outline color="primary" className="btn-lg btn-block mb-5"
                                         type="submit" onClick={this.toggle}> 
                                            Place Order
                                        </Button>

                                    </Form>

                                    
                                    

                                        <Modal isOpen={this.state.modal} toggle={this.toggle}>

                                            <ModalHeader toggle={this.toggle}
                                            cssModule={{'modal-title': 'w-100 text-center'}}>
                                                <div className="d-flex justify-content-center"> 
                                                    <h2> Order Placed</h2>
                                                </div>
                                            </ModalHeader>

                                            <ModalBody>
                                            <div className="d-flex justify-content-center"> 
                                                <i class="fas fa-check fa-5x"/>
                                            </div>
                                            </ModalBody>

                                            <ModalFooter cssModule={{'modal-title': 'w-100 text-center'}}>
                                            <div className="d-flex justify-content-center"> 
                                                <h5>You will receive your item within 14 working days</h5>
                                            </div>
                                            </ModalFooter>

                                        </Modal>
                                        

                                    
                                </div>//end of container tag

                            )//end of return

                        }//end of value
                    }{/* opening braces end */}
                    
                </ProductConsumer>

            </section>
        )
    }
}

export default Payment
