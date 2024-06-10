import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';
import { Response, generateProductId } from 'App/Utils/ApiUtils';
export default class ProductsController {
    public async store({auth, request, response }: HttpContextContract) {
        try {
            const supplierID = auth.user?.id
            const { picture, name, discription, price, supplier_id } = await request.validate(ProductValidator)
            const product = new Product()
            await picture.move(Application.tmpPath('upload'), {
                name: `${Date.now()}-${picture.clientName}`,
            })
            if(picture.fileName){
                product.picture = picture.fileName
            }
            product.name = name
            product.discription = discription
            product.price = price
            supplier_id = supplierID
            await product.save()

            product.productId = generateProductId(product.id)
            await product.save()

            // Send success response
            return response.send(Response({ message: 'Successfully Add product' }))
        } catch (error) {
            console.log(error)
            return response.status(400).send(error)
        }
    }
}

