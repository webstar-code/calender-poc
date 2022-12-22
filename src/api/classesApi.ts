import { IClass, ISlot } from "../interfaces";
import { faunaQueries } from "./fauna/query-manager";

export async function addClass(data: IClass) {
  const res = await faunaQueries.addClass(data)
  console.log(res);
  return res;
}


export async function getClasses() {
  return await faunaQueries.getClasses()
    .then((res) => {
      if (res) {
        // @ts-ignore
        return res.data.map((item) => item.data);
      } else {
        return null
      }
    })
    .catch((err) => console.log(err))
}


export const classesApi = {
  addClass,
  getClasses
}