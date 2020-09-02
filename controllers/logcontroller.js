let express = require('express');
let router = express.Router();
let validateSession = require('../middlewares/validate-session');
const log = require('../models/log');
const user = require('../../../../Javascript-Library/5-node-Server/server/models/user');
const Log = require('../db').import('../models/log');

router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
     .then(log => res.status(200).json({
        message: 'user created'
    }))
     .catch(err => res.status(500).json({error: err}))
});

router.get('/',validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(log => res.status(200).json({
       log
    }))
    .catch(err => res.status(500).json({error: err}))
});

router.get('/:id',validateSession, (req, res) => {
    let log_id = req.params.id;

    Log.findAll({
        where: { id: log_id, owner_id:req.user.id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json("error:err"))
});

router.put("/:id", validateSession, (req, res) => {
  
    Log.update(req.body.log,  
        {where: {id: req.params.id, owner_id: req.user.id}
    })
    .then((logs) => { res.status(200).json(logs)})
    .catch((err) => {res.status(500).json({error: err})})
})

router.delete("/:id", validateSession, (req, res) => {

    Log.destroy({
        where: {id: req.params.id, owner_id: req.user.id}
    })
    .then(() => {res.status(200).json({message: "Log entry removed"})})
    .catch((err) => {res.status(500).json({error: err})})
})

module.exports = router;    