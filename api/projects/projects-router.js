// Write your "projects" router here!
const express = require('express')
const { validateProjectId, validateProject } = require('./projects-middleware')


const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) =>{
    Project.get()
    .then(projects =>{
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId,(req, res, next) =>{
    res.json(req.project)
    .catch(next)
})

router.post('/', validateProject, (req, res, next) =>{
    res.status(201).json(req.project)
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject,(req, res, next) =>{
    Project.update(req.params.id, { 
    name: req.name, 
    description: req.description
    })
    .then(()=>{
        return Project.get(req.params.id)
    })
    .then(project =>{
        res.json(project)
    })
    .catch(next)
    })

router.delete('/:id', validateProjectId, async (req, res, next) =>{
    try{
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err){
        next(err)
    }
    
})

router.get('/:id/actions', async (req, res, next) =>{
    try{
        const action = await Project.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'the action with the specified id does not exist'
            })
        } else{
            const messages = await Project.getProjectActions(req.params.id)
            res.json(messages)
        }
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