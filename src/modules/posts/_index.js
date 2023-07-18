import { readFileSync } from "fs";
import { join } from "path";
import { pubsub } from "../../graphql/pubsub.js";
import { addPost } from "./add-post.js";
import { listPosts } from "./list-posts.js";
import { showPost } from "./show-post.js";
import { editPost } from "./edit-post.js";
import { removePost } from "./remove-post.js";
import { showUser } from "../users/show-user.js";
import { isLoggedIn } from "../../graphql/is-loggedin.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "posts", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    posts: async (_, args, contextValue) => {
      isLoggedIn(contextValue)

      return listPosts(contextValue);
    },
    post: (_, args) => {
      return showPost({ id: args.id });
    },
  },
  Mutation: {
    createPost: async (_, args,contextValue) => {
      isLoggedIn(contextValue)

      const result = await addPost(args.input);
       
      pubsub.publish("POST_CREATED", { postCreated: result });

      return result;
    },
    updatePost: (_, args,contextValue) => {
      isLoggedIn(contextValue)

      return editPost({ id: args.id, ...args.input },contextValue.user.id);
    },
    removePost: (_, args) => {
      isLoggedIn(contextValue)
      return removePost({ id: args.id });
    },
  },
 
  Post: {
    user: (parent) => {
      return showUser({ id: parent.user_id });
    },
    verified_by: (parent,args,contextValue)=>{
     return showUser({id:parent.verified_by})
    },
  },
};

export default { typeDefs, resolvers };
