import React from 'react';
import '../App.css';
import api from "../actions/api.js";

class userProfile extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPhone = this.onChangeUserPhone.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteMe = this.onDeleteMe.bind(this);

        this.state = {
            userid :  localStorage.getItem('uid'),
            name : "",
            email : "",
            phone : "",
            password : "",
            image : null,
            profilePic : '../../public/user.png'
        }
    }

    componentDidMount() {
        console.log("id is :"+ this.state.userid);
        api.createUser().fetchById(this.state.userid)
            .then(res => {
                if (res.data.image !== null){
                    this.setState({
                        profilePic : res.data.image.name
                    })
                }
                console.log("get image :"+res.data.image);
                this.setState({
                    name : res.data.name,
                    email : res.data.email,
                    phone : res.data.phone,
                    password : res.data.password
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeUserName(e) {
       this.setState({ name: e.target.value });
    }
    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeUserPhone(e) {
        this.setState({ phone: e.target.value })
    }
    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        if(window.confirm("Are you sure to change this details?")) {

            console.log("submit image :"+this.state.image)
            const fd = new FormData();
            fd.append('image',this.state.image);

            const userObject = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                image : fd
            };

            api.createUser().updateUserDetails(this.state.userid, userObject)
                .then((res) => {
                    alert("Your Data is Updated.");
                }).catch((err) => {
                console.log(err);
            })

            // Redirect to Student List
            this.props.history.push('/profile/' + this.state.userid)
        }
    }

    onDeleteMe(){
        if (window.confirm("Are you sure to delete your account?")) {
            api.createUser().delete(this.state.userid)
                .then((res) => {
                    alert("Your Account Successfully Deleted.");
                    localStorage.clear();
                    window.location.href = '/login';

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    imageSelectHandler = event => {
        this.setState({
            image : event.target.files[0],
            profilePic :  URL.createObjectURL(event.target.files[0])
        })
        console.log(this.state.image);
        console.log(event.target.files[0].name);
        console.log("image :"+ this.state.profilePic);

    }

    render() {

            return (
                <div className="container">
                    <br></br><br></br>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card shadow">
                                <div className="card-header form-card-header text-white"><i className="fa fa-user p-2" /> My Profile </div>

                                <div className="card-body">

                                    {/* Profile Picture and Main Details  */}
                                    <div className="row p-1 ml-5">
                                        <div className="col-3 p-3 float-left bg-light mr-2">
                                            <img src={this.state.profilePic} alt="" className=" border border-primary fas fa-cat rounded-circle" width="100px" height="100px" />
                                            <input type="file" onChange={this.imageSelectHandler} className="p-2 form-control bg-light border-0 font-weight-lighter"/>
                                            {/*<input type="button" onClick={this.imageUploadHandler} value="upload"/>*/}
                                        </div>

                                        <div className="col float-right bg-light">
                                            <div className="font-weight-normal mt-3 pl-2 text-left lead ">{this.state.name}</div>
                                            <div
                                                className=" mt-2 pl-2 text-left font-weight-light text-primary">{this.state.email}
                                            </div>
                                        </div>

                                    </div>

                                    {/* User Detail Form */}
                                    <form autoComplete="off" className="mt-3 shadow-sm  pt-3" onSubmit={this.onSubmit}>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Name</label>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="name" value={this.state.name}  onChange={this.onChangeUserName}/>
                                                <small>
                                                    <div className="p-2 float-left" style={{color: "red"}}> </div>
                                                </small>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Phone
                                                Number</label>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onChangeUserPhone}/>
                                                <small>
                                                    <div className="p-2 float-left" style={{color: "red"}}> </div>
                                                </small>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Email</label>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeUserEmail} />
                                                <small>
                                                    <div className="p-2 float-left" style={{color: "red"}}> </div>
                                                </small>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangeUserPassword} />
                                                <small>
                                                    <div className="p-2 float-left" style={{color: "red"}}> </div>
                                                </small>
                                            </div>
                                        </div>

                                        <div className=" float-right">
                                            <button type="submit"
                                                    className="btn btn-light btn-outline-primary border-secondary float-right"> Update
                                                Information
                                            </button>
                                        </div>

                                    </form>

                                    <div className="float-right mr-2">

                                        <button onClick={this.onDeleteMe} className="btn btn-light btn-outline-danger border-secondary"> Delete
                                            My Account
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            )
        }
}

export default userProfile;
