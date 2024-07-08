import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import { Response, generateOrderId } from 'App/Utils/ApiUtils'
import AddressValidator from 'App/Validators/AddressValidator'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'
import OrderValidator from 'App/Validators/OrderValidator'
export default class OrdrersController {
    public async store({ auth, request, response }: HttpContextContract) {
        try {
            const resellerID = auth.user?.id
            if (!resellerID) {
                return response.status(401).send(Response({ message: 'Unauthorized: Reseller ID is missing' }))
            }
            const { name, phone_number, city, full_address } = await request.validate(AddressValidator)
            const address = new Address()
            const { quantity, price, profit, deleivery_charges, total_price, status, product_id } = await request.validate(OrderValidator)
            const order = new Order()

            address.name = name
            address.phoneNumber = phone_number
            address.city = city
            address.fullAddress = full_address
            await address.save()

            order.resellerId = resellerID
            order.quantity = quantity as number
            order.productId = product_id
            order.price = price
            order.profit = profit
            order.deleiveryCharges = deleivery_charges
            order.totalPrice = total_price
            order.status = status as string
            await order.save()

            order.orderId = generateOrderId(order.id)
            await order.save()

            return response.send(Response({ message: 'Successfully Order Placed' }))
        }
        catch (error) {
            console.error('Error while processing order:', error)
            return response.status(200).send(error)
        }
    }
    public async index({ response }: HttpContextContract) {
        try {
            const orders = await Order.query()
                .preload('reseller')
                .preload('product')
                .preload('addres')

            const formattedProducts = orders.map((order) => {
                return {
                    id: order.id,
                    quantity: order.quantity,
                    price: order.price,
                    profit: order.profit,
                    deleivery_charges: order.deleiveryCharges,
                    total_price: order.totalPrice,
                    tracking: order.tracking,
                    status: order.status,
                    product_id: order.product.id,
                    picture: order.product.picture,
                    name: order.product.name
                }
            })

            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(error)
        }
    }
    public async getBySupplier({ auth, response }: HttpContextContract) {
        try {
            const supplierID = auth.user?.id || 0
            const orders = await Order.query()
                .where('supplier_id', supplierID)
                .preload('addres')
                .preload('product')
                .preload('supplier')

            const formattedProducts = orders.map((order) => {
                return {
                    id: order.id,
                    tracking: order.tracking,
                    status: order.status,
                    product_id: order.product.id,
                    picture: order.product.picture,
                    name: order.product.name,
                    quantity: order.quantity
                }
            })
            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching orders' }));
        }
    }
    public async getByReseller({ auth, response }: HttpContextContract) {
        try {
            const resellerID = auth.user?.id || 0
            const orders = await Order.query()
                .where('reseller_id', resellerID)
                .preload('addres')
                .preload('product')

            const formattedProducts = orders.map((order) => {
                return {
                    id: order.id,
                    tracking: order.tracking,
                    status: order.status,
                    product_id: order.product.id,
                    picture: order.product.picture,
                    name: order.product.name,
                    quantity: order.quantity
                }
            })
            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching orders' }));
        }
    }
    public async update({ request, response, params }: HttpContextContract) {
        try {
            const { tracking, status} = await request.validate(OrderUpdateValidator)
            const order = await Order.findOrFail(params.id)

            order.tracking = tracking
            order.status = status
            await order.save()

            // Send success response
            return response.send(Response({ message: 'Successfully updated Order' }))
        } catch (error) {
            console.log(error)
            return response.status(200).send(error)
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const order = await Order.findOrFail(params.id)
            await order.delete()

            // Send success response
            return response.send(Response({ message: 'Successfully delete order' }))
        } catch (error) {
            console.log(error)
            return response.status(400).send(error)
        }
    }
    public async dispatch({ response }: HttpContextContract) {
        try {
            const orders = await Order.query()
                .preload('reseller')
                .preload('product')
                .preload('addres')

            const formattedProducts = orders.map((order) => {
                return {
                    id: order.id,
                    quantity: order.quantity,
                    price: order.price,
                    profit: order.profit,
                    deleivery_charges: order.deleiveryCharges,
                    total_price: order.totalPrice,
                    tracking: order.tracking,
                    status: order.status,
                    product_id: order.product.id,
                    picture: order.product.picture,
                    name: order.addres.name,
                    city: order.addres.city,
                    full_address: order.addres.fullAddress,
                    phone_number: order.addres.phoneNumber
                }
            })

            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(error)
        }
    }
}
