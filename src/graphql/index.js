import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import schema from "./schema.js";
import { expressMiddleware } from "@apollo/server/express4";
import jwt from "jsonwebtoken";
import config from "../shared/config/index.js";

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

  const serverMiddleware = () =>
    expressMiddleware(server, {
      context: ({ req }) => {
        const token = req.headers.authorization;
        
        if (token) {
          const decoded = jwt.verify(token, config.jwt.secret);
          return { user: decoded.user };
        }

        return { user: {} };
      },
    });
  return { server, serverMiddleware };
};
