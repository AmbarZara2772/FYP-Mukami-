import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BankAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public accountNumber: string

  @column()
  public accountHolder: string

  @column()
  public accountType: string

  @column()
  public resellerId: number

  @column()
  public supplierId: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
