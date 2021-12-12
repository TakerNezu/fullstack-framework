import {rest} from "msw"
import {postRes} from "./api/typeDefinition"

export const handler = [
  rest.get('/api/post', (req, res, ctx) => {
    const data: postRes = {
      post: [
        {id: 1, title: "aa", author: "author", comment: [{id: 1, body: "comment"}]}
      ]
    }
    return res(ctx.status(200), ctx.json(data))
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