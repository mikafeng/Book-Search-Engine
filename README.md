# Book Shell

A MERN stack application that allows users to search books and save them when logged in. 

## Usage

The application utitlizes GraphQL and Apollo for the backend and create React App for the client side. MongoDB and Mongoose serve as the database framework. When Users sign in, thier information will persist in the database so they may sign in again. The search bar uses Google Books search API. Once saved, Users may also delete books. Users can not save books without being logged in.

## Technology Used

* [GraphQL/Apollo](https://www.apollographql.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [React Create App](https://create-react-app.dev/)

## In Process Bugs

When clicking the Save button or going to Saved books for a User ~ there is an error for input being passed. However, I've found it is because the User is not being recognized through these pathways. Login and Sign up work and saved books when done through apollo persist in the database. There is some disconnect between frontend receiving data.

## View

## License 

MIT
