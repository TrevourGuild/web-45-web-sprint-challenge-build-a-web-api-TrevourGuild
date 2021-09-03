// Write your "actions" router here!
const express = require('express')


// const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) =>{
    res.json('array of actions')
    .catch(next)
})

router.get('/:id', (req, res, next) =>{
    res.json('action id object')
    .catch(next)
})

router.post('/', (req, res, next) =>{
    
    res.json('new action')
    .catch(next)
})

router.put('/:id', (req, res, next) =>{
   
    res.json('update action')
    .catch(next)
})

router.delete('/:id', (req, res, next) =>{
    res.json('delete action')
    .catch(next)
})

router.use((err, req, res, next) =>{ //eslint-disable-line
    res.status(err.status || 500).json({
      message:err.message,
      customMessage: 'Something bad inside the hubs router!'
    })
})

module.exports = router