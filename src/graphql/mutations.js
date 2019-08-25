import gql from 'graphql-tag'

export const LOG_IN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`
export const VALIDATE_USER = gql`
    mutation Validate($token: String!) {
        verifyUserToken(token: $token)
    }
`

export const REGISTER = gql`
    mutation SignUp(
        $username: String!
        $firstName: String
        $lastName: String
        $email: String!
        $password: String!
        $passwordConfirm: String!
    ) {
        signUp(
            username: $username
            firstname: $firstName
            lastname: $lastName
            email: $email
            password: $password
            passwordConfirm: $passwordConfirm
        )
    }
`
