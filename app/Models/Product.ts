import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Supplier from './Supplier'
import Order from './Order'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: string

  @column()
  public picture: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public categoryId: number

  @column()
  public supplierId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Supplier)
  public supplier: BelongsTo<typeof Supplier>

  @hasMany(() => Order)
  public order: HasMany<typeof Order>
}
