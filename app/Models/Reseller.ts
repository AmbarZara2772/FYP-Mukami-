import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reseller extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public resellerId: string

  @column()
  public phoneNumber: string

  @column()
  public businessName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
