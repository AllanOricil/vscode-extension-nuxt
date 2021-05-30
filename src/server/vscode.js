const routes = require('express').Router();
const { fingerprint } = require('../utilities/fingerprint');

routes.get("/fingerprint", (req, res) => {
    try{
        res.status(200).send({
            fingerprint
        })
    }catch(error){
        console.error(error);
        res.status(400).send({
            error: 'Could not create a determine the machine fingerprint'
        })
    }
});

module.exports = routes;