import {profileReq, profileRes} from "$mock/api/typeDefinition";

export type Methods = {
  get: {
    query?: profileReq
    resBody: profileRes
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