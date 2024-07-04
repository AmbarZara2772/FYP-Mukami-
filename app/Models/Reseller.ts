import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

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

 @hasMany(() => Order)
 public orders: HasMany<typeof Order>

 @hasOne(() => Reseller, {
  foreignKey: 'resellerId'
 })
 public reseller:HasOne<typeof Reseller>

}
