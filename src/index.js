import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {ApolloServer} from '@apollo/server';
import express from 'express'
import cors from 'cors'
import {useServer} from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws';
import {expressMiddleware} from '@apollo/server/express4';

const app=express()
const httpServer=http.createServer(app);




app.use(cors())
app.use(express.json())

const wsserver=new WebSocketServer({
    server:httpServer,
    path:'/api'
})

const typeDefs=`#graphql
type Query{
    ping:String!
}
`
const resolvers={
    Query:{
        ping:()=>'Pong'
    }
}

const serverCleanup=useServer({typeDefs,resolvers},wsserver)

const server=new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
  
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],

})

await server.start()

app.use('/api',expressMiddleware(server))

httpServer.listen(8080,()=>{
    console.log(`Server is listening on port`);
})


