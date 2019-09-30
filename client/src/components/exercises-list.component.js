import React,{ Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => (//This is a functional react component(does not have state or life cycle methods)
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>{/*We dont need the time zone and extra details of date*/}
      <td>
        <Link className="btn btn-primary" to={"/edit/"+props.exercise._id}>edit</Link> | <button className="btn btn-primary" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
      </td>
    </tr>
  )

export default class ExercisesList extends Component{//class component
    constructor(props){
        super(props);
        this.onDeleteExercise=this.onDeleteExercise.bind(this);
        this.state ={exercises:[]}

    }

    componentDidMount(){
        axios.get('/exercises/')
            .then(response => {
                this.setState({
                    exercises:response.data
                })
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDeleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(
                res => {
                    console.log(res.data);
                }
            )
            .catch(
                err => console.log(err)
            );
        this.setState({
            exercises:this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise =>{
            return <Exercise exercise={currentExercise} deleteExercise={this.onDeleteExercise} key={currentExercise._id}/>
        })
    }

    render(){
        return(
            <div>
        <h3>Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
        );
    }
}