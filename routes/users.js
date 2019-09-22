const router = require('express').Router();
let User = require('../models/user.model');

//Routing a get request to display users ie.rooturl/users
router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:'+ err));
});

//Routing a post request to add a new user
router.route('/add').post((req,res) => {
    const username =req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error:'+ err));
});

module.exports = router;
