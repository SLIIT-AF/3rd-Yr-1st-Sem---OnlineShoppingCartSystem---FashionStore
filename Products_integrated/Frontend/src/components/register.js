import React from 'react';
import '../App.css';
import api from "../actions/api.js";
import  './register.css'
import sidImg from '../images/fash.png';
import {Link} from "react-router-dom";

const initialState = {
    name: "",
    phone: "",
    email: "",
    password: "",
    pass2: "",
    nameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
    pass2Error: ""
}


class Register extends React.Component {
    
    state =initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            api.createUser().fetchAll().then(res => {
                const user = res.data.filter( user => user.email===this.state.email);
                if(user.length>0){
                    alert("This Email Already Exists!")
                }else{
                    api.createUser().create(this.state)
                    .then(res => {
                        alert("Register successfull!")
                        this.setState(initialState)
                        window.location.href = '/login'
                    } );
                }
            });
        }
    }

    validate = () => {
        let nameError = "";
        let phoneError = "";
        let emailError = "";
        let passwordError = "";
        let pass2Error = "";

        if(!this.state.name){
            nameError="Name Required!"
        }

        if(!this.state.phone){
            phoneError="Phone Number Required!"
        }else if(this.state.phone.length!==10){
            phoneError = "Invalid Phone Number!";
        }else if(isNaN(this.state.phone)){
            phoneError = "Use only digits!";
        }

        if(!this.state.email){
            emailError="Email Required!"
        }else if(!this.state.email.includes('@')){
            emailError = "Invalid Email!";
        }

        if(!this.state.password){
            passwordError="Password Required!"
        }

        if(!this.state.pass2){
            pass2Error="Confirm Password Required!"
        }else if(this.state.password!==this.state.pass2){
            pass2Error="Password & Confirm Password Not Equal!"
        }

        if(emailError || passwordError || nameError || phoneError || pass2Error){
            this.setState({ emailError , passwordError , nameError , phoneError , pass2Error});
            return false;
        }

        return true;
    }

    render (){
        return (
            <div class="container-fluid register-bg">
            <br/>

                <div class="row">

                    <div className="col-md-3 img-fluid">
                        <img src={sidImg} alt={sidImg.toString()}  className="reg-side-img float-left" />
                    </div>

                    <div class="col-md-8">
                        <br></br>

                        <div className="card shadow">
                            <div className="card-header register-header text-light">
                                <h1>Register</h1>
                            </div>

                            <div className="card-body">

                                <form autoComplete="off" onSubmit={this.handleSubmit}>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Name</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                            <small><div className="p-2 float-left" style={{color : "red"}}>{this.state.nameError}</div></small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Phone Number</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                            <small><div className="p-2 float-left" style={{color : "red"}}>{this.state.phoneError}</div></small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Email</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                            <small><div className="p-2 float-left"  style={{color : "red"}}>{this.state.emailError}</div></small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Password</label>
                                        <div class="col-md-6">
                                            <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                            <small><div className="p-2 float-left"  style={{color : "red"}}>{this.state.passwordError}</div></small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                        <div class="col-md-6">
                                            <input type="password" class="form-control" name="pass2" value={this.state.pass2} onChange={this.handleChange} />
                                            <small><div className="p-2 float-left"  style={{color : "red"}}>{this.state.pass2Error}</div></small>
                                        </div>
                                    </div>

                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary btn-light border-dark float-right">
                                            Register
                                        </button>
                                    </div>
                                </form>

                                <div className="p-2 mt-5 small">Already have an Account ? <Link to={"/login"} className=" p-1 pl-2 pr-2 btn-link bg-light border rounded-pill">Sign in</Link></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;
