import { Client } from "faunadb";

console.log(process.env.FAUNA_DB);

export const fauna = new Client({
  secret: process.env.FAUNA_DB,
});
