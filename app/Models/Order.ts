import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id: number

  @column()
  public supplier_id: number

  @column()
  public product_id: number

  @column()
  public reseller_id: number

  @column()
  public quantity: number

  @column()
  public price: number

  @column()
  public profit: number

  @column()
  public deleivery_charges: number

  @column()
  public total: number

  @column()
  public tracking: string

  @column()
  public status: string

  @column()
  public address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
