import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import schema from "./schema.js";

export const buildGraphqlServer = function (httpServer) {
  const wsserver = new WebSocketServer({
    server: httpServer,
    path: "/api",
  });

  const serverCleanup = useServer(schema, wsserver);

  const server = new ApolloServer({
    schema,
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
  });

  return server;
  
};
