import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run () {

    const categories = ['books', 'supports', 'gaming', 'house hold', 'kitchen gadget']

    for (const name of categories) {
      await Category.firstOrCreate({name})
    }
  }
}
