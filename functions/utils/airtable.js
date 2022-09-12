const Airtable = require('airtable')

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)

const table = base(AIRTABLE_TABLE_NAME)

const getAllTodos = async () => {
  const allTodos = await table.select({}).firstPage()
  return allTodos.map(({ id, fields }) => transformResponse(id, fields))
}

const addTodo = async ({ todo }) => {
  const { name, description, date, assignee, status } = todo
  const createTodo = await table.create([
    {
      fields: {
        name,
        description,
        date,
        assignee,
        status,
      },
    },
  ])
  const { id, fields } = createTodo[0]
  return transformResponse(id, fields)
}

const transformResponse = (id, fields) => ({
  id,
  name: fields.name,
  description: fields.description,
  date: fields.date,
  status: fields.status,
  assignee: fields.assignee
})

exports.getAllTodos = getAllTodos
exports.addTodo = addTodo
