import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Supplier from './Supplier'

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
}
