// import { Supplier } from 'App/Models/Supplier';
import { DateTime } from 'luxon'
// import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public Supplier_id: number

  @column()
  public phone_number: number

  @column()
  public shop_name: string

  @column()
  public phone_logo: string

  @column()
  public cnic_front: string

  @column()
  public cnic_back: string

  @column()
  public adress: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword (supplier: Supplier) {
  //   if (supplier.$dirty.password) {
  //     supplier.password = await Hash.make(supplier.password)
  //   }
  // }
}
