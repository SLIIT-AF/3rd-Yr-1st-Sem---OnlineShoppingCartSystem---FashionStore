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
            return  [<button type='button' onClick={() => this.onChange(id,"admin")} class='btn btn-sm btn-warning'>Admin</button>,
            " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} class='btn btn-sm btn-success'>S.M.</button>];
        }else if(type==="admin"){
            return [<button type='button' onClick={() => this.onChange(id,"user")} class='btn btn-sm btn-warning'>User</button>,
                " | ",
            <button type='button' onClick={() => this.onChangeSM(id,email)} class='btn btn-sm btn-success'>S.M</button>];
        }else if(type==="sm"){
            return [<button type='button' onClick={() => this.onChange(id,"admin")} class='btn btn-sm btn-warning'>Admin</button>,
                " | ",
            <button type='button' onClick={() => this.onChange(id,"user")} class='btn btn-sm btn-success'>User</button>];
        }
    }

    render (){
        if(localStorage.getItem('email')){
            const {users} = this.state;

            let filteredUser = users.filter(
                (user) =>{
                    return user.email.indexOf(this.state.search) !== -1;
                }
            );

            return (
                <div class="container">
                <br></br><br></br>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card shadow-sm">
                                <div class="card-header form-card-header text-white"><i className="fa fa-user p-2"></i>User Management</div>
                                <div class="card-body">

                                    <div className="form-group row">
                                        <label  className=" pl-2 m-2">Search Users: </label>
                                        <i className="fa fa-search p-2 bg-dark text-light"></i>
                                        <input type="text" className="col-md-5 float-right form-control" placeholder="Enter user email" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                                    </div>

                                    <table className="table table-hover table-responsive-lg shadow-sm">
                                        <thead className="bg-light text-dark">
                                            <tr>
                                                <th class="tableTh">Name</th>
                                                <th class="tableTh">Email</th>
                                                <th class="tableTh">Phone</th>
                                                <th class="tableTh">User Type</th>
                                                <th class="tableTh">Edit Privilege</th>
                                                <th class="tableTh">Remove User</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredUser.map((user) =>

                                            <tr>
                                                <td class="tableTh">{ user.name }</td>
                                                <td class="tableTh">{ user.email }</td>
                                                <td class="tableTh">{ user.phone }</td>
                                                <td class="tableTh">{ user.type }</td>
                                                <td class="tableTh">{this.edit(user.type,user._id,user.email)}</td>
                                                <td class="tableTh"><button type='button' onClick={() => this.onDelete(user._id)} class='btn btn-danger'>Delete</button></td>
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
