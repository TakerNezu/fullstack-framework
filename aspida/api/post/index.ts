import {postReq, postRes} from "$mock/api/typeDefinition";

export type Methods = {
  get: {
    query?: postReq
    resBody: postRes
  }

  // post: {
  //   reqBody: {
  //     name: string
  //   }
  //
  //   resBody: User
  //   /**
  //    * reqHeaders(?): ...
  //    * reqFormat: ...
  //    * status: ...
  //    * resHeaders(?): ...
  //    * polymorph: [...]
  //    */
  // }
}