import { schema, rules,  CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    product_id: schema.number([rules.required()]),
    quantity: schema.number.optional([rules.range(1, Number.MAX_SAFE_INTEGER)]),
    price: schema.number([rules.required()]),
    profit: schema.number([rules.required()]),
    deleivery_charges: schema.number([rules.required()]),
    total_price: schema.number([rules.required()]),
    status: schema.string.optional([rules.required(), rules.equalTo('pending')]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
   'supplier_id.required': 'Supplier ID is required.',
    'quantity.range': 'Quantity must be at least 1.',
    'price.required': 'Price is required.',
    'profit.required': 'Profit is required.',
    'deleivery_charges.required': 'Deleivery charges are required.',
    'deleivery_charges.equals': 'Deleivery charges must be exactly 200.',
    'total_price.required': 'Total is required.',
    'status.equals': 'Status must be "pending".',
    'address.required': 'Address is required.'
    
  }
}
