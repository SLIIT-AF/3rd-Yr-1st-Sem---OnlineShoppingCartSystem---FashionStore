import React from 'react';
import '../App.css';
import api from "../actions/api.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const initState = {
    all_comments: [],
    rating: "",
    ratingError: "",
    cmBtn: "Send",
    comment: "",
    commentError: "",
    cId: "",
    avgRate:""
}

class comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    onComChange(id,msg,rate){
        this.setState({cmBtn:"EDIT",cId:id,comment:msg,rating:rate});
    }

    componentDidMount() {
        const url = "http://localhost:3500/comments";
        fetch(url).then(response => response.json())
        .then(json => {const msg = json.filter(msg => msg.product===localStorage.getItem('itemId')) // localStorage.getItem('itemId') sessiion
            console.log(msg.length)
            var total=0
            for(var i=0;i<msg.length;i++){
                total=total+msg[i]['rating']
            }
            var avg= total/msg.length
            this.setState({all_comments: msg,avgRate:avg.toFixed(2)})
        })
    }

    onClearCom(){
        this.setState(initState);
        this.componentDidMount();
    }

    editComButton(id,msg,email,rate){
        if(localStorage.getItem('userEmail')){ //localStorage.getItem('userEmail') session
            if(email===localStorage.getItem('userEmail')){ //localStorage.getItem('userEmail') session
                return  [<button type='button' onClick={() => this.onComChange(id,msg,rate)} class='btn btn-success'>EDIT</button>,
                        <button type='button' onClick={() => this.onComDelete(id)} class='btn btn-danger'>Delete</button>];
            }
        }
    }

    onComDelete(id){
        if (window.confirm("Are you sure to delete comment?")) {
            api.message().delete(id)
            .then(res =>{
                alert("Delete Successful!")
                this.componentDidMount()
            });
        }
    }

    form_sub = e => {
        e.preventDefault();
        const isValid = this.checkCom();
        if(isValid){
            if(localStorage.getItem('userEmail')){
                const data ={ comment:this.state.comment,name:localStorage.getItem('userName'),email:localStorage.getItem('userEmail'),product:localStorage.getItem('itemId'),rating:this.state.rating }
                if(this.state.cId){
                    api.message().update(this.state.cId,{ comment:this.state.comment , rating:this.state.rating })
                    .then(res =>{
                        alert("Change Successful!")
                        this.setState(initState)
                        this.componentDidMount()
                    })
                }else{
                    api.message().create(data)
                    .then(res => {
                        alert("Comment add successful!")
                        this.setState(initState)
                        this.componentDidMount()
                    } );
                }
                
            }else{
                alert("Please Login to the system!")
            }
        }
    }

    checkCom = () => {
        let commentError = "";

        if(!this.state.comment){
            commentError="Comment Required!"
        }

        if(commentError){
            this.setState({ commentError });
            return false;
        }else{
            this.setState({ commentError });
        }

        return true;
    }

    render (){
        const { all_comments } = this.state;
        return (
            <div class="container">
            <br></br><br></br>
                <div class="justify-content-center">
                    <hr/>
                        <h1>Ratings : {this.state.avgRate}/10</h1>
                    <hr/>
                    <form autoComplete="off" onSubmit={this.form_sub}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Rate</label>
                            <div class="col-md-6">
                                <select class="form-control" name="rating" value={this.state.rating} onChange={this.handleChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Comment</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="comment" value={this.state.comment} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.commentError}</div>
                            </div>
                        </div>
                                
                        <div class="col-md-4 offset-md-4">
                            <input type="submit" class="btn btn-primary" value={this.state.cmBtn} />
                            <input type="button" class="btn btn-danger" value="Clear" onClick={() => this.onClearCom()} />
                        </div>
                    </form>
                    <hr/>
                    <table>
                        {
                            all_comments.map((msg) =>

                            <tr>
                                <td width="150px"><img width="100px" alt="" src="user.png"/></td>
                                <td><h5>{ msg.name }</h5>
                                <br/><h7>{ msg.comment }</h7></td>
                                <td width="200px">{this.editComButton(msg._id,msg.comment,msg.email,msg.rating)}</td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
        );
    }
}

export default comment;
