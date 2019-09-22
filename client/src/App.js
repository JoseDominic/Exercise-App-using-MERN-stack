//This file loads at the start of the app
import React from 'react';
import { BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import CreateExercise from "./components/create-exercise.component";
import EditExercise from "./components/edit-exercise.component";
import CreateUser from "./components/create-user.component";

//Router defines the routes for different paths pointed to by the Link React Component which helps to load different components
function App() {
  return (
    <Router>
    <div className="container"> 
    <Navbar />
    <Route path="/" exact component={ExercisesList} />
    <Route path="/edit/:id" component={EditExercise} />
    <Route path="/create" component={CreateExercise} />
    <Route path="/user" component={CreateUser} />
    </div>
    </Router>
  );
}

export default App;
