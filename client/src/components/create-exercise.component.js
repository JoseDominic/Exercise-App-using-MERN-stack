//React component to create exercise for a user

import React,{ Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
 

export default class CreateExercises extends Component{ //This is a class component
    constructor(props){
        super(props);//always call constructor of super-class for extended classes first in react

        //Below code defines 'this' as the parent class for different functions 
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        //variables in a component are defined in the constructor
        this.state = {
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
    }
    //executes before anything loads inside the component
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(
                response => {
                    if(response.data.length>0){
                        this.setState({
                            users:response.data.map(user => user.username),
                            username:response.data[0].username
                        }
                        )
                    }
                }
            );
    }
    //functions to change the state variables as the the user input changes in the input fields
    onChangeUser(e){
        this.setState({
            username:e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date:date
        });
    }

    onSubmit(e){
        e.preventDefault(); //prevents the default submit action of the form

        const exercise = {
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date,

        }

        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(
                res => console.log(res.data)
            )

        

        window.location='/'; //changes the location to root page
    }

    render(){
        return(
            <div>
                <h3>Create new exercise log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <select required ref="userInput" //dropdown list
                        onChange={this.onChangeUser}
                        value={this.state.username}
                        className="form-control">
                            {   //we are returning options of dropdown from the component state
                                //map is used to return something for each element of a list
                                this.state.users.map((user)=>{
                                    return <option 
                                        key={user}
                                        value={user}>
                                        {user}
                                        </option>
                                
                                })
                            }        
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input required type="text"
                        onChange={this.onChangeDescription}
                        className="form-control"
                        value={this.state.description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input required type="text"
                        onChange={this.onChangeDuration}
                        className="form-control"
                        value={this.state.duration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create Exercise" className="btn btn-primary"/>  
                    </div>        
                </form>
            </div>
        );
    }
}