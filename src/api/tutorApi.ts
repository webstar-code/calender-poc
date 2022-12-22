import { ISlot } from "../interfaces";
import { faunaQueries } from "./fauna/query-manager";

export async function getTutorByName(name: string) {

  const data = await faunaQueries.getTutorByName(name);
  return {
    ...data[0].data,
    refId: data[0].ref.value.id
  };

}


export async function updateTutorCalender(refId: string, timeslots: ISlot[]) {

  const data = await faunaQueries.updateTutorCalender(refId, timeslots)
  console.log(data);
  return timeslots;

}

export const tutorsApi = {
  getTutorByName,
  updateTutorCalender
}