import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const addPost = async (payload) => {
  console.log(payload, "aaa");
  const user = await db("users").where({ id: payload.user_id }).first();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const result = await db("posts").insert(payload).returning("*");

  return result[0];
};
