import { Client, Collection, CreateCollection, Exists, If } from "faunadb";

const CreateClassesCollection = CreateCollection({ name: "classes" });


async function createClassesCollection(client: Client) {
  await client.query(If(Exists(Collection("classes")), true, CreateClassesCollection));
}

export { createClassesCollection } 
