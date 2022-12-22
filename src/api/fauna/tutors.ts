import { Client, Collection, CreateCollection, CreateIndex, Exists, If } from "faunadb";

const CreateTutorCollection = CreateCollection({ name: "tutors" });

export const CreateTutorNameIndex = CreateIndex({
  name: "tutors_by_name",
  source: Collection("tutors"),
  terms: [
    {
      field: ["data", "name"]
    }
  ]
})

async function createTutorCollection(client: Client) {
  await client.query(If(Exists(Collection("tutors")), true, CreateTutorCollection));
  await client.query(If(Exists(Collection("tutors_by_name")), true, CreateTutorNameIndex));

}

export { createTutorCollection } 
