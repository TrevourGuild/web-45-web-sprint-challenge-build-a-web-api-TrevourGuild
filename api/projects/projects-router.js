// Write your "projects" router here!
const express = require('express')


// const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) =>{
    res.json('array of projects')
    .catch(next)
})

router.get('/:id', (req, res, next) =>{
    res.json('project id object')
    .catch(next)
})

router.post('/', (req, res, next) =>{
    
    res.json('new project')
    .catch(next)
})

router.put('/:id', (req, res, next) =>{
   
    res.json('update project')
    .catch(next)
})

router.delete('/:id', (req, res, next) =>{
    res.json('delete project')
    .catch(next)
})

router.get('/:id/actions', (req, res, next) =>{
    res.json('array of actions by id')
    .catch(next)
})

router.use((err, req, res, next) =>{ //eslint-disable-line
    res.status(err.status || 500).json({
      message:err.message,
      customMessage: 'Something bad inside the hubs router!'
    })
})

module.exports = router