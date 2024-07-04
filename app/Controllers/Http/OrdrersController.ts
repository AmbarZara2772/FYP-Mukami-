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

            const { reseller_id, quantity, price, profit, deleivery_charges, total_price, status } = await request.validate(OrderValidator)
            const order = new Order()
            const { name, phone_number, city, full_address } = await request.validate(AddressValidator)
            const address = new Address()


            order.resellerId = reseller_id
            order.quantity = quantity as number
            order.price = price
            order.profit = profit
            order.deleiveryCharges = deleivery_charges
            order.totalPrice = total_price
            order.status = status as string
            address.name = name
            address.phoneNumber = phone_number
            address.city = city
            address.fullAddress = full_address
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
                .preload('payment')
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
                    reseller_id: order.reseller.id,
                    product_id: order.product.id,
                    payment_id: order.payment.id,
                }
            })

            return response.send(Response({ data: formattedProducts }));
        } catch (error) {
            console.log(error);
            return response.status(200).send(Response({ message: 'An error occurred while fetching products' }));
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


}

// {
//     "quantity": "1",
//     "price": "999",
//     "profit": "199",
//     "deleivery_charges": "200",
//     "total_price": "1398",
//     "status": "pending",
//     "name": "zara",
//     "city": "lahore",
//     "full_address": "model town lahore",
//     "phone_number": "03457598367"
// }