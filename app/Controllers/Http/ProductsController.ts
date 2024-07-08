import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';
import { Response, generateProductId } from 'App/Utils/ApiUtils';
export default class ProductsController {
    public async store({ auth, request, response }: HttpContextContract) {
        try {
            const supplierID = auth.user?.id
            if (!supplierID) {
                return response.status(401).send(Response({ message: 'Unauthorized: Supplier ID is missing' }));
            }
            const { picture, name, price, description, category_id } = await request.validate(ProductValidator)
            const product = new Product()
            await picture.move(Application.tmpPath('upload'), {
                name: `${Date.now()}-${picture.clientName}`,
            })
            if (picture.fileName) {
                product.picture = picture.fileName
            }
            product.name = name
            product.description = description
            product.price = price
            product.categoryId = category_id
            product.supplierId = supplierID
            await product.save()

            product.productId = generateProductId(product.id)
            await product.save()

            // Send success response
            return response.send(Response({ message: 'Successfully Add product' }))
        } catch (error) {
            console.log(error)
            return response.status(200).send(error)
        }
    }
    public async index({ response }: HttpContextContract) {
        try {
            const products = await Product.query()
                .preload('category')
                .preload('supplier');

            const formattedProducts = products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    picture: product.picture,
                    category_name: product.category.name,
                    shop_name: product.supplier.shopName
                }
            })

            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching products' }));
        }
    }

    public async getByCategory({ params, response }: HttpContextContract) {
        try {
            const products = await Product.query()
                .where('category_id', params.id)
                .preload('category')
                .preload('supplier')

            const formattedProducts = products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    picture: product.picture,
                    category_name: product.category.name,
                    shop_name: product.supplier.shopName
                }
            })
            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching products' }));
        }
    }
    public async getBySupplier({ auth, response }: HttpContextContract) {
        try {
            const supplierID = auth.user?.id || 0
            const products = await Product.query()
                .where('supplier_id', supplierID)
                .preload('category')
                .preload('supplier')

            const formattedProducts = products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    picture: product.picture,
                    category_name: product.category.name,
                    shop_name: product.supplier.shopName
                }
            })
            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching products' }));
        }
    }
    public async search({ request, response }: HttpContextContract) {
        try {
            const searchQuery = request.input('name') || '';
    
            const products = await Product.query()
                .where('name', 'like', `%${searchQuery}%`)
                .preload('category')
                .preload('supplier');
    
            const formattedProducts = products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    picture: product.picture,
                    category_name: product.category.name,
                    shop_name: product.supplier.shopName
                }
            })
    
            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while searching for products' }));
        }
    }
    
    public async update({ request, response, params }: HttpContextContract) {
    try {
        const { picture, name, price, description, category_id } = await request.validate(ProductValidator)
        const product = await Product.findOrFail(params.id)

        if (picture) {
            await picture.move(Application.tmpPath('upload'), {
                name: `${Date.now()}-${picture.clientName}`,
            })
            if (picture.fileName) {
                product.picture = picture.fileName
            }
        }
        product.name = name
        product.description = description
        product.price = price
        product.categoryId = category_id
        // product.supplierId = supplier_id
        await product.save()

        // Send success response
        return response.send(Response({ message: 'Successfully updated product' }))
    } catch (error) {
        console.log(error)
        return response.status(200).send(error)
    }
}

    public async destroy({ params, response }: HttpContextContract) {
    try {
        const product = await Product.findOrFail(params.id)
        await product.delete()

        // Send success response
        return response.send(Response({ message: 'Successfully delete product' }))
    } catch (error) {
        console.log(error)
        return response.status(400).send(error)
    }
}
}
