import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/Admin'

export default class UserSeeder extends BaseSeeder {

  public async run () {
    await User.createMany([
      {
        name: 'zara',
        password: 'secret',
      },
      {
        name: 'maha',
        password: 'secret'
      }
    ])
  }

}

