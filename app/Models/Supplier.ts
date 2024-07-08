// import { Supplier } from 'App/Models/Supplier';
import { DateTime } from 'luxon'
// import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel, HasMany, hasMany, hasOne, HasOne, } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'
export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public supplierId: string

  @column()
  public phoneNumber: string

  @column()
  public shopName: string

  @column()
  public shopLogo: string

  @column()
  public cnicNumber: string

  @column()
  public address: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasOne(() => Supplier, {
    foreignKey: 'supplierId'
  })
  public supplier: HasOne<typeof Supplier>

  @hasMany(() => Order)
  public order: HasMany<typeof Order>


  // @beforeSave()
  // public static async hashPassword (supplier: Supplier) {
  //   if (supplier.$dirty.password) {
  //     supplier.password = await Hash.make(supplier.password)
  //   }
  // }
}
