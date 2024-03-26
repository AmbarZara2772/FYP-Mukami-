import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reseller extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public reseller_id: number

  @column()
  public phone_number: number

  @column()
  public business_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
