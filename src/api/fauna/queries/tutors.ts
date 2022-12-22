import { Collection, Create, Documents, Expr, Get, Index, Lambda, Match, Now, Paginate, Ref, Var } from "faunadb";
import faunadb from 'faunadb';

const q = faunadb.query;

function CreateTutor(name: Expr) {
  return Create(Collection("tutors"), {
    data: {
      name: name,
      created_at: Date.now(),
      updated_at: Date.now()
    }
  })
}

async function getTutorByRefId(id: string) {
  return Get(Ref(Collection("tutors"), id))
}

async function getTutorByName(name: string) {
  return Match(Index("tutors_by_name"), name)
}

async function getTutors() {
  return q.Map(
    Paginate(Documents(Collection('tutors'))),
    Lambda(x => Get(x))
  )
}

export const GetAllTutors = q.Map(
  // map over the references returned from paginate
  Paginate(Documents(Collection('tutors'))),
  // for each of these references, get the document
  Lambda(['x'], Get(Var('x')))
)

export const TutorsApi = {
  getTutorByName,
  getTutorByRefId,
  getTutors,
  GetAllTutors
}

export { CreateTutor, }
