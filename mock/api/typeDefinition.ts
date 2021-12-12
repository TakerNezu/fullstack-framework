import {Task, Post, Comment, Profile} from "$prisma/client"

/**
 * APIのリクエスト、レスポンスに関する型定義
 */

const task: Task = {
  id: 1,
  label: "aaa",
  done: true,
}

console.log(task)

export type postReq = {
  id: Post["id"]
}
export type postRes = {
  post: Array<Post & {
    comment: Array<{
      id: Comment["id"]
      body: Comment["body"]
    }>
  }>
}

export type profileReq = {id: Profile["id"]}
export type profileRes = {profile: Profile}
