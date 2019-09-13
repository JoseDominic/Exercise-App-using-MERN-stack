const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//Routing a get request to display users ie.rooturl/users
router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error:'+ err));
})

//Routing a post request to add a new user
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({username,description,duration,date});

    newExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => res.status(400).json('Error:'+ err));
});

//find an exercise by ID
router.route('/:id').get( (req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:'+err));
});

//delete an exercise by id
router.route('/:id').delete( (req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted'))
        .catch(err => res.status(400).json('Error:'+err));
});

//update an exercise by id
router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username,
            exercise.description = req.body.description,
            exercise.duration = req.body.duration,
            exercise.date = req.body.date

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error:'+err));
        })
        .catch(err => res.status(400).json('Error:'+err));
});

module.exports = router;
