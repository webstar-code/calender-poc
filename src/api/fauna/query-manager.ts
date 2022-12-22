import faunadb, { Call, Collection, Create, Documents, Function, Get, Index, Lambda, Map, Match, Paginate, Ref, Update, Var } from 'faunadb'
import { IClass } from '../../interfaces';

class QueryManager {
  client;
  bootstraptoken

  constructor(token?: any) {
    this.bootstraptoken = token || ""
    this.client = new faunadb.Client({
      secret: token || this.bootstraptoken
    })
  }

  async setSecret(secret: string) {
    this.client = new faunadb.Client({
      secret: secret
    })
  }

  async getUserByName(name: string) {
    const res = await this.client.query(
      Map(
        Paginate(
          Match(Index("users_by_name"), name)
        ),
        Lambda(
          "person",
          Get(Var("person"))
        )
      )
      // Match(Index("users_by_email"), email)
    )
    if (res) {
      // @ts-ignore
      return res.data;
    } else {
      return null
    }
  }

  async getTutorByName(name: string) {
    const res = await this.client.query(
      Map(
        Paginate(
          Match(Index("tutors_by_name"), name)
        ),
        Lambda(
          "person",
          Get(Var("person"))
        )
      )
      // Match(Index("users_by_email"), email)
    )
    if (res) {
      // @ts-ignore
      return res.data;
    } else {
      return null
    }
  }


  async updateTutorCalender(refId: string, data: any) {
    console.log(refId, data)
    return await this.client.query(
      Update(Ref(Collection("tutors"), refId), {
        data: {
          tutorCalender: {
            timeslots: data
          }
        }
      })
    ).then((res) => res)
      .catch((err) => console.log(err))
  }


  async addClass(data: IClass) {
    try {
      const res = await this.client.query(
        Create(Collection("classes"), {
          data: {
            ...data,
          },
        })
      );
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  async getClasses() {
    try {
      const res = await this.client.query(
        Map(
          Paginate(Documents(Collection("classes"))),
          Lambda(x => Get(x))
        )
      );
      return res;
    } catch (err) {
      console.log(err)
    }
  }


}



const faunaQueries = new QueryManager("fnAE4aoZX4ACWQt-QCtg1smH_IVtyJ7mr2-98hiX");
let q = faunaQueries.client.query;
export { faunaQueries, QueryManager, q }
