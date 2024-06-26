import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class SupplierValidator {
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
    phone_number: schema.string([rules.required(), rules.regex(/^0\d{10}$/), rules.unique({ table: 'suppliers', column: 'phone_number'})]),
    shop_name: schema.string([rules.required(), rules.unique({ table: 'suppliers', column: 'shop_name'}), rules.maxLength(20)]),
    cnic_number: schema.string([rules.required(),  rules.regex(/^\d{5}-\d{7}-\d{1}$/), rules.unique({ table: 'suppliers', column: 'cnic_number'}), ]),
    shop_logo: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'svg']
    }),
  address: schema.string([rules.required(), rules.regex(/^.{5,200}$/)])
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
    'phone_number.required': 'Enter phone number',
    'phone_number.regex': 'Correct your phone number',
    'shop_name.required': 'Enter your shop',
    'shop_name.regex': 'The length of  shop name should be 2-50 characters',
    'cnic_number.unique': 'this cnic is already exist',
    'cnic_number.regex': 'follow CNIC format',
    'address.required': 'Enter full adress',
    'address.regex': 'The length of full adress should be 5-200 characters'
  }
}
