import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
export default class UserSeeder extends BaseSeeder {

  public async run () {
     await Admin.create({
      username: 'zara',
      password: 'Pass12$$'
    })
  }
}


