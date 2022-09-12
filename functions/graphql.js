const { ApolloServer, gql } = require('apollo-server-lambda')
const { getAllTodos, addTodo } = require('./utils/airtable')

const typeDefs = gql`
  type Todo {
    id: ID
    name: String
    description: String
    date: String
    status: String
    assignee: String
  }

  input TodoInput {
    name: String
    description: String
    date: String
  }

  type Query {
    getTodos: [Todo]
    addTodo(todo: TodoInput): Todo
  }
`

const resolvers = {
  Query: {
    getTodos: () => {
      try {
        const allRecords = getAllTodos()
        return allRecords
      } catch (error) {
        throw new Error(error)
      }
    },
    addTodo: (_, args) => {
      try {
        const createTodo = addTodo(args)
        return createTodo
      } catch (error) {}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
