import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, } from '@ioc:Adonis/Lucid/Orm'
import Reseller from './Reseller'
import Product from './Product'
import Address from './Address'
import Supplier from './Supplier'


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

  @column()
  public profitStatus: string

  @column()
  public saleStatus: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Reseller)
  public reseller: BelongsTo<typeof Reseller>

  @belongsTo(() => Product)
  public product:BelongsTo<typeof Product>

  @belongsTo(() => Address)
  public addres:BelongsTo<typeof Address>

  @belongsTo(() => Supplier)
  public supplier: BelongsTo<typeof Supplier>


}
