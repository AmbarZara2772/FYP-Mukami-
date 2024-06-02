import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
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
    name: schema.string([rules.required(), rules.regex(/^.{2,50}$/)]),
    phone_number: schema.string([rules.required(), rules.regex(/^0\d{10}$/),]),
    city: schema.string([rules.required()]),
    full_address: schema.string([rules.required(), rules.regex(/^.{5,200}$/)])
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
    'name.required': 'Enter your name',
    'name.regex': 'The length of name should be 2-50 characters',
    'phone_number.required': 'Enter phone number',
    'phone_number.regex': 'Correct your phone number',
    'city.required': 'Enter your city',
    'full_address.required': 'Enter full adress',
    'full_address.regex': 'The length of full adress should be 5-200 characters'

  }
}
