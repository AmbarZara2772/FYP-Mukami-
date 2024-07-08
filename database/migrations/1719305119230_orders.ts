import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('order_id', 255).nullable()
      table.integer('reseller_id', 255).unsigned().references('id').inTable('resellers').onDelete('CASCADE')
      table.integer('product_id', 225).unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('address_id', 225).unsigned().references('id').inTable('addresses').onDelete('CASCADE')
      table.integer('supplier_id', 225).unsigned().references('id').inTable('suppliers').onDelete('CASCADE')
      table.integer('quantity', 180).notNullable()
      table.integer('price', 255).notNullable()
      table.integer('profit', 255).notNullable()
      table.integer('deleivery_charges', 255).notNullable()
      table.integer('total_price', 255).notNullable()
      table.string('tracking', 255).nullable()
      table.string('status', 255).notNullable()
      table.string('profit_status', 180).nullable()
      table.string('sale_status', 180).nullable()

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
