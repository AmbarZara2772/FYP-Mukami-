import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import { Response } from 'App/Utils/ApiUtils'
import AdminValidator from 'App/Validators/AdminValidator'

export default class AdminsController {
  //store
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(AdminValidator)
      await Admin.create(data)
      return response.send(Response({ message: 'Successfully Create Admin' }))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
  //index
  public async index({ response }: HttpContextContract) {
    try {
      const product = await Admin.all()
      return response.send(Response(product))
    }
    catch (error) {
      return response.status(400).send(error)
    }
  }
  //update
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const admin = await Admin.findOrFail(params.id)
      const data = await request.validate(AdminValidator)
      await admin.merge(data).save()
      response.send(Response({ message: "Successfully updated Admin" }))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
  //destry
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const admin = await Admin.findOrFail(params.id)
      await admin.delete()
      return response.send(Response({ message: "Successfully delete admin" }))
    }
    catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
}




