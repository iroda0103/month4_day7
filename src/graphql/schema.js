import {makeExecutableSchema} from '@graphql-tools/schema';

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
    typeDefs:[typeDefs],
    resolvers:[resolvers],
})


export default schema