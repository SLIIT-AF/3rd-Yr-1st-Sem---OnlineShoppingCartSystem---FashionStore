import React from 'react';
import '../App.css';

class Order extends React.Component {

    render (){
        if(localStorage.getItem('email')){
            return (
                <div className="container">
                <br></br>
                    <div class="row justify-content-center">
                        <div className="col-md-12">  
                            <h2>Orders</h2>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Order;
