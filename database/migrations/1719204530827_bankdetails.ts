import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bankdetails'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('supplier_id', 225).notNullable().unsigned().references('id').inTable('suppliers').onDelete('CASCADE')
      table.integer('reseller_id', 225).notNullable().unsigned().references('id').inTable('resellers').onDelete('CASCADE')
      table.string('account_number', 225).notNullable()
      table.string('account_holdere', 225).notNullable()
      table.string('account_type', 225).notNullable()

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
