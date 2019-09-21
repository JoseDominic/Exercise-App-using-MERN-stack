import React,{ Component} from "react";
import axios from "axios";

export default class CreateUsers extends Component{

    constructor(props){
        super(props);//always call constructor of super-class for extended classes first in react

        //Below code defines 'this' as the parent class for different functions 
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        
        //variables in a component are defined in the constructor
        this.state = {
            username:''
        }
    }

    onChangeUser(e){
        this.setState({
            username:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault(); //prevents the default submit action of the form

        const user = {
            username:this.state.username,

        }

        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));
        this.setState({
            username:''
        })
        window.location='/'; //changes the location to root page
    }

    render(){
        return(
            <div>
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input required type="text"
                        onChange={this.onChangeUser}
                        className="form-control"
                        value={this.state.username}
                        />
                        
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>  
                    </div>        
                </form>
            </div>
        );
    }
}