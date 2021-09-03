// add middlewares here related to actions
const Action = require('../actions/actions-model')

function logger(req, res, next){
    console.log(`it is a ${req.method} request!`)
    next()
}

async function validateActionId(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'not found'
            })
        } else{
            req.action = action
            next()
        }

    }catch (err){
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}

function validateAction(req, res, next){
    const { notes } = req.body
    console.log(req.body)
    if( !notes || !notes.trim()){
        res.status(400).json({
            message: 'Missing notes field'
        })
    } else {
        req.notes = notes.trim()
        next()
    }
}


module.exports = {
    logger,
    validateActionId,
    validateAction
}