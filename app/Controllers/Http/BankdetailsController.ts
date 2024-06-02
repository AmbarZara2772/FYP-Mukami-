 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BankAccount from 'App/Models/BankDetail'
import { Response } from 'App/Utils/ApiUtils'
import BankDetailValidator from 'App/Validators/BankDetailValidator'
export default class BankdetailsController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const { account_number, account_holder, account_type,  } = await request.validate(BankDetailValidator)
            const bankdetail = new BankAccount()
    
            bankdetail.accountNumber = account_number
            bankdetail.accountHolder = account_holder
            bankdetail.accountType = account_type
            await bankdetail.save()

            // Send success response
            return response.send(Response({ message: 'Successfully Add Bank Account' }))
        } catch (error) {
            console.log(error)
            return response.status(400).send(error)
        }
    }
}

