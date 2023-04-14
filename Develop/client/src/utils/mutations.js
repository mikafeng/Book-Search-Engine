import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    title
                    descrition
                    authors
                    link
                    image
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String! ,$email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    bookId
                    title
                    description
                    image
                    link
                }
            }
        }
    }
`;



export const SAVE_BOOK = gql`
    mutation saveBook($input: bookInput!) {
        saveBook(input: $input) {
            _id
            username
            email
            savedBooks
            {       bookId
                    authors
                    title
                    description
                    image
                    link
                }
        }
    }
`;


export const DELETE_BOOK = gql`
   mutation deleteBook($bookId: ID!) {
    delteBook(bookId: $bookId)
    _id
    username
    email
    savedBooks {
         bookId
            authors
            title
            description
            image
            link
    }
   }
`;