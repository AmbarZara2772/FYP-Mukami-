import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { Response, generateCategoryId } from 'App/Utils/ApiUtils'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
    public async store({ request, response }: HttpContextContract) {
        try {
          const {name} = await request.validate(CategoryValidator)
          const category = new Category

          category.name = name
          await category.save()

          category.categoryId = generateCategoryId(category.id)
          await category.save()
          return response.send(Response({ message: 'Successfully Added category' }))
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async index({response }: HttpContextContract){
        try {
         const category = await Category.all()
          return response.send(Response(category))
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async update({params, request, response}: HttpContextContract) {
        try {
          const category = await Category.findOrFail(params.id)
          const data = await request.validate(CategoryValidator)
          await category.merge(data).save()
          response.send(Response({message: "Successfully updated "}))
        }
        catch (error) {
          console.log(error)
          return response.status(400).send(error)
        }
      }
      public async destroy({params, response}: HttpContextContract) {
        try {
          const category = await Category.findOrFail(params.id)
          await category.delete()
          return response.send(Response({message: "Successfully delete category"}))
        }
        catch (error)  {
          console.log(error)
          return response.status(400).send(error)
        }
      }
}
