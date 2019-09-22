const express = require('express'); //nodejs framework for creating web apps
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config(); //for setting environment variables on server

const app = express(); //creating the app

//Serve static assets if in production
if(process.env.NODE_ENV ==='production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*',(req, res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}
////////////////////////////////////////
const port = process.env.PORT || 5000;

app.use(cors()); //for cross origin resource sharing ie.cross domain requests
app.use(express.json()); //for handling json data

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',() => {
    console.log('Database connection established successfully');
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//executes the files in the second argument when user enters the url 'rooturl/firstargument'
app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port,() => {
    console.log(`Server is running on port:${port}`);
});


