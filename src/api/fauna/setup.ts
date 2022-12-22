import { Client } from "faunadb";
import { createClassesCollection } from "./classes";
import { handleSetupError } from "./errors";
import { createTutorCollection } from "./tutors";
import { createUserCollection } from "./users";


export async function setupFauna(client: Client) {
  await handleSetupError(createUserCollection(client), "users collection")
  await handleSetupError(createTutorCollection(client), "tutors collection")
  await handleSetupError(createClassesCollection(client), "classes collection")

}