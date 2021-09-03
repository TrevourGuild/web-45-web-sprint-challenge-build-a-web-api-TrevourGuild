// add middlewares here related to projects
const Project = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try{
        const project = await Project.get(req.params.id)
        if(!project){
            res.status(404).json({
                message: 'not found'
            })
        } else{
            req.project = project
            next()
        }
    } catch (err){
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}

function validateProject(req, res, next){
    const { name, description } = req.body
    if(!name || !description){
        res.status(400).json({
            message: 'Missing required name or description field'
        })
    } else{
       Project.insert({name, description})
       .then(({ id }) =>{
           return Project.get(id)
       })
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject
}