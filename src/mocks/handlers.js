import { rest } from 'msw'
import { books } from './__data__/books.json'

export const handlers = [
  rest.get('/books', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(books)
    )
  }),
]