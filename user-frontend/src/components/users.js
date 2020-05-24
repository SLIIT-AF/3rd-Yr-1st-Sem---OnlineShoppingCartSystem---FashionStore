import React from 'react';
import '../App.css';
import api from "../actions/api.js";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: ""
        }
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }

    componentDidMount() {
        const url = "http://localhost:3500/user";
        fetch(url).then(response => response.json())
        .then(json => this.setState({users: json.filter(user => user.email!==localStorage.getItem('email'))}))
    }

    onDelete(id){
        console.log("delete id :"+id);

        if (window.confirm("Are you sure to delete ?")) {
            api.createUser().delete(id)
            .then(res =>{
                alert("Delete Successful!")
                this.componentDidMount()
            });
        }
    }

    onChange(id,type){
        if (window.confirm("Are you sure to change?")) {
            var data = { type:type}
            api.createUser().update(id,data)
            .then(res =>{
                alert("Change Successful!")
                this.componentDidMount()
            })
        }
    }

    onChangeUserDetails(id,name,email,phone,password){
        console.log(" onChangeUserDetails - id :"+id);

        if(window.confirm("Are you sure to edit this user? ")){
            var data = {
                name: name,
                email : email,
                phone : phone,
                password : password
            }
            api.createUser().updateUserDetails(id,data)
                .then(res => {
                    alert("User Primary Details are Changed.");
                    this.componentDidMount();
                })
        }
    }

    onChangeSM(id,email){
        if (window.confirm("Are you sure to change ?")) {
            var data = { type:"sm"}
            api.createUser().update(id,data)
            .then(res =>{
                alert("Change Successful!")
                this.componentDidMount()
                var data = { email:email }
                api.createUser().send_email(data)
            })
        }
    }

    edit(type,id,email){
        if(type==="user"){
            return  [<button type='button' onClick={() => this.onChange(id,"admin")} className='btn btn-sm btn-warning'>Admin</button>,
            " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} className='btn btn-sm btn-success'>S.M.</button>];
        }else if(type==="admin"){
            return [<button type='button' onClick={() => this.onChange(id,"user")} className='btn btn-sm btn-warning'>User</button>,
                " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} className='btn btn-sm btn-success'>S.M</button>];
        }else if(type==="sm"){
            return [<button type='button' onClick={() => this.onChange(id,"admin")} className='btn btn-sm btn-warning'>Admin</button>,
                " | ",
            <button type='button' onClick={() => this.onChange(id,"user")} className='btn btn-sm btn-success'>User</button>];
        }
    }

    render (){
        if(localStorage.getItem('email')){
            const {users} = this.state;

            let filteredUser = users.filter(
                (user) =>{
                    return (user.email && user.email.indexOf(this.state.search) !== -1);
                }
            );

            return (
                <div className="container">
                <br></br><br></br>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card shadow-sm">
                                <div className="card-header form-card-header text-white"><i className="fa fa-user p-2"></i>User Management</div>
                                <div className="card-body">

                                    <div className="input-group mb-3">
                                        <label  className="mr-2">Search Users: </label>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
                                        </div>

                                        <input type="text" className="form-control" aria-describedby="basic-addon1" placeholder="Find user from email" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                                    </div>

                                    <table className="table table-hover table-responsive-lg shadow-sm">
                                        <thead className="bg-light text-dark">
                                            <tr>
                                                <th className="tableTh">Name</th>
                                                <th className="tableTh">Email</th>
                                                <th className="tableTh">Phone</th>
                                                <th className="tableTh">User Type</th>
                                                <th className="tableTh">Change Privilege</th>
                                                <th className="tableTh">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredUser.map((user) =>

                                            <tr>
                                                <td className="tableTh">{ user.name }</td>
                                                <td className="tableTh">{ user.email }</td>
                                                <td className="tableTh">{ user.phone }</td>
                                                <td className="tableTh font-italic">{ user.type }</td>
                                                <td className="tableTh">{this.edit(user.type,user._id,user.email)}</td>
                                                <td className="tableTh"><button type='button' onClick={() => this.onChangeUserDetails(user._id,user.name,user.email,user.phone, user.password)} className='btn btn-primary btn-sm'>Update</button>
                                                <button type='button' onClick={() => this.onDelete(user._id)} className='btn btn-danger ml-1 btn-sm'>Delete</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Users;
