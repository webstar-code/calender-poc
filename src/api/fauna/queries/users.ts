import { Collection, Create, Documents, Expr, Get, Index, Lambda, Match, Now, Paginate, Ref, Var } from "faunadb";
import faunadb from 'faunadb';

const q = faunadb.query;

function CreateUser(name: Expr) {
  return Create(Collection("users"), {
    data: {
      name: name,
      created_at: Date.now(),
      updated_at: Date.now()
    }
  })
}

async function getUserByRefId(id: string) {
  return Get(Ref(Collection("users"), id))
}

async function getUserByName(name: string) {
  return Match(Index("users_by_name"), name)
}

async function getUsers() {
  return q.Map(
    Paginate(Documents(Collection('users'))),
    Lambda(x => Get(x))
  )
}

export const GetAllUsers = q.Map(
  // map over the references returned from paginate
  Paginate(Documents(Collection('users'))),
  // for each of these references, get the document
  Lambda(['x'], Get(Var('x')))
)

export const usersApi = {
  getUserByName,
  getUserByRefId,
  getUsers,
  GetAllUsers
}

export { CreateUser, }
