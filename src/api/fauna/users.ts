import { Client, Collection, CreateCollection, CreateIndex, Exists, If } from "faunadb";

const CreateUserCollection = CreateCollection({ name: "users" });


export const CreateUserNameIndex = CreateIndex({
  name: "users_by_name",
  source: Collection("users"),
  terms: [
    {
      field: ["data", "name"]
    }
  ]
})

async function createUserCollection(client: Client) {
  await client.query(If(Exists(Collection("users")), true, CreateUserCollection));
  await client.query(If(Exists(Collection("users_by_name")), true, CreateUserNameIndex));
}

export { createUserCollection } 
