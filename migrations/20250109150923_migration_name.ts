import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("firstName", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.string("middleName", 100).nullable();
    table.string("username", 50).unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("phoneNumber").unique().notNullable();
    table.string("password").notNullable();
    table.string("role", 10).notNullable().defaultTo("student");
    table.date("birthDate").nullable();
    table.json("address").nullable();
    table.json("hobbies").nullable();
    table.string("language", 50).nullable();
    table.string("educationLevel", 50).nullable();
    table.string("nationality", 50).nullable();
    table.string("gender", 10).nullable();
    table.string("profilePicture").nullable();
    table.boolean("verified").notNullable().defaultTo(false);
    table.string("token", 50).nullable();
    table.timestamp("exp_time").nullable();
    table
      .enum("status", ["active", "blocked", "suspended"])
      .notNullable()
      .defaultTo("active");
    table.timestamp("lastLogin").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
