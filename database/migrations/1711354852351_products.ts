import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('category_id', 255).unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('supplier_id', 255).unsigned().references('id').inTable('suppliers').onDelete('CASCADE')
      table.string('product_id', 255)
      table.text('picture').notNullable()
      table.string('name', 255).notNullable()
      table.integer('price', 255).notNullable()
      table.string('description', 255).notNullable()
     

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
