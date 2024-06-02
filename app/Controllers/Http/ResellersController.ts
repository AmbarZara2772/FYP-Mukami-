 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Response } from 'App/Utils/ApiUtils'
import Reseller from "App/Models/Reseller"
import ResellerValidator from "App/Validators/ResellerValidator"

export default class ResellersController {
    public async store({ request, response }: HttpContextContract) {
        try {
          const reseller = await request.validate(ResellerValidator)
          await Reseller.create(reseller)
          return response.send(Response({message: 'Add Reseller successfully'})) 
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async index({response }: HttpContextContract){
        try {
         const reseller = await Reseller.all()
          return response.send(Response(reseller))
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async update({params, request, response}: HttpContextContract) {
        try {
          const reseller = await Reseller.findOrFail(params.id)
          const data = await request.validate(ResellerValidator)
          await reseller.merge(data).save()
          response.send(Response({message: "Successfully updated Reseller"}))
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }public async destroy({params, response}: HttpContextContract) {
        try {
          const reseller = await Reseller.findOrFail(params.id)
          await reseller.delete()
          return response.send(Response({message: "Successfully delete Reseller"}))
        }
        catch (error)  {
          console.log(error)
          return response.status(400).send(error)
        }
      }
}
