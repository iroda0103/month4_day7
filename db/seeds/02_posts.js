/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: 1,
      title: "Dasturlash nimadan boshlanadi",
      content: "loremloremloremloremloremloremloremlorem",
      user_id: 3,
      is_verified: true,
      verified_by: 1,
    },
    {
      id: 2,
      title: "Frontend",
      content: "loremloremloremloremloremloremloremlorem",
      user_id: 3,
      is_verified: true,
      verified_by: 1,
    },
    {
      id: 3,
      title: "Backend",
      content: "loremloremloremloremloremloremloremlorem",
      user_id: 4,
      is_verified: false,
      verified_by: null,
    },
  ]);
};
