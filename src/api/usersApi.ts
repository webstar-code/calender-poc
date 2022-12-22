import { faunaQueries } from "./fauna/query-manager";

export async function getUserByname(name: string) {

  const data = await faunaQueries.getUserByName(name);
  return {
    ...data[0].data,
    refId: data[0].ref.value.id
  };

}

export const userApi = {
  getUserByname
}