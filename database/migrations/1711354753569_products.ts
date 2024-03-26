import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('supplier_id', 255).notNullable()
      table.string('product_id', 255).notNullable()
      table.integer('name', 180).notNullable()
      table.string('discription', 180).notNullable()
      table.integer('price', 255).notNullable()
      table.string('status', 255).notNullable()
      table.string('category_id', 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
