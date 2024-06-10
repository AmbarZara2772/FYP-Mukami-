import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import SupplierValidator from 'App/Validators/SupplierValidator'
import Supplier from 'App/Models/Supplier'
import { generateSupplierId } from 'App/Utils/ApiUtils'
import { Response } from 'App/Utils/ApiUtils'
import SupplierLoginValidator from 'App/Validators/SupplierLoginValidator'
export default class SuppliersController {
  public async register({ request, response }: HttpContextContract) {
    try {
      // Validate request data
      const { phone_number, shop_name, shop_logo, cnic_number, address } = await request.validate(SupplierValidator)
      const supplier = new Supplier()

      await shop_logo.move(Application.tmpPath('uploads'), {
        name: `${Date.now()}-${shop_logo.clientName}`,
      })
      supplier.phoneNumber = phone_number
      supplier.shopName = shop_name
      supplier.shopLogo = shop_logo.fileName || ""
      supplier.cnicNumber = cnic_number
      supplier.address = address
      await supplier.save()

      supplier.supplierId = generateSupplierId(supplier.id)
      await supplier.save()

      // Send success response
      return response.send(Response({ message: 'Successfully Create Supplier' }))
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const suppliers = await Supplier.all()
      return response.send(Response(suppliers))
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Validate request data
      const { phone_number, shop_name, shop_logo, cnic_number, address } = await request.validate(SupplierValidator)
      const supplier = await Supplier.findOrFail(params.id)

      if (shop_logo) {
        await shop_logo.move(Application.tmpPath('uploads'), {
          name: `${Date.now()}-${shop_logo.clientName}`,
        })
        supplier.shopLogo = shop_logo.fileName || ""
      }

      supplier.phoneNumber = phone_number
      supplier.shopName = shop_name
      supplier.cnicNumber = cnic_number
      supplier.address = address
      await supplier.save()
      return response.send(Response({ message: 'Successfully update Supplier' }))
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const supplier = await Supplier.findOrFail(params.id)
      await supplier.delete()

      // Send success response
      return response.send(Response({ message: 'Successfully delete Supplier' }))
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { phone_number } = await request.validate(SupplierLoginValidator)
    try {
      const supplier = await Supplier.findByOrFail('phoneNumber', phone_number)
      const token = await auth.use('api_supplier').generate(supplier)
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

