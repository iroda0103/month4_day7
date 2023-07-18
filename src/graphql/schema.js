import {makeExecutableSchema} from '@graphql-tools/schema';
import userSchema from '../modules/users/_index.js'
import postSchema from '../modules/posts/_index.js'

const typeDefs=`#graphql
type Query{
    ping:String!
}
`
;
const resolvers={
    Query:{
        ping:()=>'Pong'
    }
}

const schema=makeExecutableSchema({
    typeDefs:[typeDefs,userSchema.typeDefs,postSchema.typeDefs],
    resolvers:[resolvers,userSchema.resolvers,postSchema.resolvers],
})


export default schema