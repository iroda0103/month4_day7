import http from 'http';
import express from 'express'
import cors from 'cors'
import {expressMiddleware} from '@apollo/server/express4';
import config from './shared/config/index.js'
import {buildGraphqlServer} from './graphql/index.js'

const app=express()
const httpServer=http.createServer(app);

app.use(cors())
app.use(express.json())

const  server=buildGraphqlServer(httpServer)
await server.start()

app.use('/api',expressMiddleware(server))

httpServer.listen(config.port,()=>{
    console.log(`Server is listening on port ${config.port}`);
})


