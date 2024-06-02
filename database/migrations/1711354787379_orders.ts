import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('order_id', 255).notNullable()
      table.integer('supplier_id', 255).notNullable()
      table.integer('product_id', 255).notNullable()
      table.integer('reseller_id', 255).notNullable()
      table.integer('quantity', 180).notNullable()
      table.integer('price', 255).notNullable()
      table.integer('profit', 255).notNullable()
      table.integer('deleivery_charges', 255).notNullable()
      table.integer('total', 255).notNullable()
      table.string('tracking', 255).notNullable()
      table.string('status', 255).notNullable()
      table.string('address', 255).notNullable()

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
