import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bankdetails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('account_number').notNullable()
      table.string('account_number').notNullable()
      table.string('account_holder').notNullable()
      table.string('supplier_id')
      table.string('reseller_id')

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
