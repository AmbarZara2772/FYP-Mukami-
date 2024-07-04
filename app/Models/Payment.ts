
import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number 

  @column()
  public profit: number

  @column()
  public sales: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Payment, {
    foreignKey: 'paymentId'
  })
  public payment:HasOne<typeof Payment>
}
