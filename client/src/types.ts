

export type UserType = {
  email: string
  exp: number, // todo: find out what is it!
  iat: number, // todo: find out what is it!
  id: string,
  name: string,
}
export type UserRegister = {
  email: string
  password: string, // todo: find out what is it!
  name: string,
}
export type UserLogin = {
  email: string
  password: string, // todo: find out what is it!
}



export type AuthTypes = {
  isAuthenticated: boolean
  user: UserType
};

export type UserTypes = {
  createdDate: string,
  email: string,
  name: string,
  __v: number, // todo: find outstring,
  _id: string,
}
export type PostTypes = {
  comments: [],
  likes: [],
  createdDate: string,
  _id: string,
  body: string
  user: UserTypes
}


export type PostsTypes = {
  posts: Array<PostTypes>,
  _id: number,
  totalCount: number,
  isLoading: boolean,
  post: number | object,
}
