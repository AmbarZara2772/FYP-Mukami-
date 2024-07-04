import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany,  } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phoneNumber: string

  @column()
  public city: string

  @column()
  public fullAddress: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order)
  public order:HasMany<typeof Order>
}
