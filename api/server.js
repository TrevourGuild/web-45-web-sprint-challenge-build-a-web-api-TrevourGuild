const express = require('express');
// const { logger } = require('./actions/actions-middlware')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const server = express();

server.use(express.json())

// server.use(logger)

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


server.get('/', (req, res) =>{
    res.send(`<h2> Hello there! <h2>`)
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
