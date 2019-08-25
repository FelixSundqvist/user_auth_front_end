import gql from 'graphql-tag'

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`

export const resolvers = {
    Query: {
        isLoggedIn: (parent, args, ctx, info) => {
            console.log(args)
            return true
        },
    },
}
