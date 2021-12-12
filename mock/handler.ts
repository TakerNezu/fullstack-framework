import {rest} from "msw"
import {postRes} from "./api/typeDefinition"

export const handler = [
  rest.get('/api/post', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json((): postRes => {
      return {
        post: [
          {id: 1, title: "aa", author: "author", comment: [{id: 1, body: "comment"}]}
        ]
      }
    }))
  }),
  rest.get('/api', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]