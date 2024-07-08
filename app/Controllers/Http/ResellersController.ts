import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Response, generateResellerId } from 'App/Utils/ApiUtils'
import Reseller from "App/Models/Reseller"
import ResellerValidator from "App/Validators/ResellerValidator"
import ResellerLoginValidator from 'App/Validators/ResellerLoginValidator'

export default class ResellersController {
  public async register({ request, response, auth}: HttpContextContract) {
    try {
      const { phone_number, business_name } = await request.validate(ResellerValidator)
      const reseller = new Reseller

      reseller.phoneNumber = phone_number
      reseller.businessName = business_name
      await reseller.save()

      const token = await auth.use('api_reseller').generate(reseller)

      reseller.resellerId = generateResellerId(reseller.id)
      await reseller.save()
      return response.send(Response({ message: 'Successfully register Reseller', token }))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
  public async index({ response }: HttpContextContract) {
    try {
      const reseller = await Reseller.all()
      return response.send(Response(reseller))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Validate request data
      const { phone_number, business_name} = await request.validate(ResellerValidator)
      const reseller = await Reseller.findOrFail(params.id)

      reseller.phoneNumber = phone_number
      reseller.businessName = business_name
      await reseller.save()
      return response.send(Response({ message: 'Successfully update reseller' }))
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const reseller = await Reseller.findOrFail(params.id)
      await reseller.delete()
      return response.send(Response({ message: "Successfully delete Reseller" }))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { phone_number } = await request.validate(ResellerLoginValidator)
    try {
      const reseller = await Reseller.findByOrFail('phoneNumber', phone_number)
      const token = await auth.use('api_reseller').generate(reseller)
      return response.json(token)
    } catch (error) {
      console.log(error)
      return response.send(Response({ message: 'Invalid credentials' }))
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.send(Response({ message: 'Successfully logged out' }))
  }
}
