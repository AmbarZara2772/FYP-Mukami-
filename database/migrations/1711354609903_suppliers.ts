import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'suppliers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('supplier_id', 255).unique()
      table.string('phone_number', 180).notNullable().unique()
      table.string('shop_name', 180).notNullable().unique()
      table.text('shop_logo',)
      table.string('cnic_number').notNullable().unique
      table.string('address', 180).notNullable()

      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
