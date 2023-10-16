/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("product",function(table){
      table.increments();
      table.string("name",64).defaultTo(null);
      table.string("kode",16).defaultTo(null);
      table.integer("harga").defaultTo(0);
      table.smallint("is_ready").defaultTo(0);
      table.text("gambar").defaultTo(null);
      table.integer("id_category_product").references("id").inTable("category_product").notNullable();
      table.bigInteger("created_by").references("id").inTable("users").defaultTo(null);
      table.bigInteger("updated_by").references("id").inTable("users").defaultTo(null);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.smallint("is_deleted").defaultTo(0);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("product");
  };
