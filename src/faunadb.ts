import faunadb from 'faunadb';

const unauthKey = "fnAE2eWb6OACTEwFgODK9jFo5WllnngBMEWVoV99";


const client = new faunadb.Client({
  secret: "fnAE4aoZX4ACWQt-QCtg1smH_IVtyJ7mr2-98hiX"
  // secret: unauthKey
});
const q = faunadb.query;
export { client, q };