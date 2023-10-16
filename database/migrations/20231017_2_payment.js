/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("payment",function(table){
      table.string("kode",32).defaultTo(null);
      table.integer("jumlah").defaultTo(0);
      table.integer("id_product").references("id").inTable("product").notNullable();
      table.bigInteger("created_by").references("id").inTable("users").defaultTo(null);
      table.bigInteger("created_at").defaultTo(Date.now());
      table.bigInteger("expired_at").defaultTo(Date.now()+1200000);// 20 Menit
      table.smallint("is_deleted").defaultTo(0);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("payment");
  };
