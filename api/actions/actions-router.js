// Write your "actions" router here!
const express = require('express')


const { validateActionId, validateAction } = require('./actions-middlware')


const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) =>{
    Action.get()
    .then(actions =>{
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) =>{
    res.json(req.action)
    .catch(next)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({ notes: req.notes })
    .then(newNote =>{
        res.status(201).json(newNote)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction,(req, res, next) =>{
    Action.update(req.params.id, {notes: req.notes})
    .then(()=>{
        return Action.get(req.params.id)
    })
    .then(action =>{
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) =>{
    try{
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err){
        next(err)
    }
})

router.use((err, req, res, next) =>{ //eslint-disable-line
    res.status(err.status || 500).json({
      message:err.message,
      customMessage: 'Something bad inside the hubs router!'
    })
})

module.exports = router