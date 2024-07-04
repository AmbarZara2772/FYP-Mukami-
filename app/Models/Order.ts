import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Reseller from './Reseller'
import Payment from './Payment'
import Product from './Product'
import Address from './Address'


export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: string

  @column()
  public productId: number

  @column()
  public resellerId: number

  @column()
  public addressId: number

  @column()
  public paymentId: number

  @column()
  public quantity: number

  @column()
  public price: number

  @column()
  public profit: number

  @column()
  public deleiveryCharges: number

  @column()
  public totalPrice: number

  @column()
  public tracking: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Reseller)
  public reseller: BelongsTo<typeof Reseller>

  @belongsTo(() => Product)
  public product:BelongsTo<typeof Product>

  @hasOne(() => Payment)
  public payment: HasOne<typeof Payment>

  @belongsTo(() => Address)
  public addres:BelongsTo<typeof Address>


}
