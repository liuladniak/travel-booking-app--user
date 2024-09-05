export function up(knex) {
  return knex.schema.createTable("images", function (table) {
    table.integer("id").primary().unsigned();
    table.integer("tour_id").unsigned().notNullable();
    table.foreign("tour_id").references("tours.id").onDelete("CASCADE");
    table.string("image_path").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("images");
}