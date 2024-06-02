import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import { Response } from 'App/Utils/ApiUtils'
import AddressValidator from 'App/Validators/AddressValidator'

export default class AdressesController {
    public async store({ request, response }: HttpContextContract) {
        try {
          const address = await request.validate(AddressValidator)
          await Address.create(address)
          return response.send(Response({message: 'Add adress successfully'})) 
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async index({response }: HttpContextContract){
      try {
       const adress = await Address.all()
        return response.send(Response(adress))
      }
      catch (error) {
        console.log(error)
        return response.status(400).send(error)
      }
    }
    public async update({params, request, response}: HttpContextContract) {
      try {
        const adress = await Address.findOrFail(params.id)
        const data = await request.validate(AddressValidator)
        await adress.merge(data).save()
        response.send(Response({message: "Successfully updated adress"}))
      }
      catch (error) {
        console.log(error)
        return response.status(400).send(error)
      }
    }
    public async destroy({params, response}: HttpContextContract) {
      try {
        const adress = await Address.findOrFail(params.id)
        await adress.delete()
        return response.send(Response({message: "Successfully delete adress"}))
      }
      catch (error)  {
        console.log(error)
        return response.status(400).send(error)
      }
    }

}