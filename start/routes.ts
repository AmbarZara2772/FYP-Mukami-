/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/



import Route from '@ioc:Adonis/Core/Route'

Route.post('/supplier/register', 'SuppliersController.register')
Route.post('/supplier/login' , 'SuppliersController.login')
Route.get('/supplier', 'SuppliersController.index')
Route.put('/supplier/:id', 'SuppliersController.update')
Route.delete('/supplier/:id', 'SuppliersController.destroy')

//Suplier API's
  Route.group(() => {
    //Supplier

  Route.post('supplier/logout' , 'SuppliersController.logout')

  Route.post('/product', 'ProductsController.store')
  Route.get('/product', 'ProductsController.index')
  Route.patch('/product/:id', 'ProductsController.update')
  Route.delete('/product/:id', 'ProductsController.destroy')

  }).prefix('/api').middleware(['auth'])


                        // Reseller Endpoints

  Route.post('/reseller/register', 'ResellersController.register')
  Route.post('/reseller/login', 'ResellersController.login')
  Route.get('/reseller', 'ResellersController.index')
  Route.put('/reseller/:id', 'ResellersController.update')
  Route.delete('/reseller/:id', 'ResellersController.destroy')

  Route.group(() => {
  Route.post('/reseller/logout', 'ResellersController.logout')

  Route.post('/address', 'AddressesController.store')
  Route.get('/address', 'AddressesController.index')
  Route.put('/address/:id', 'AddressesController.update')
  Route.delete('/address/:id', 'AddressesController.destroy')
  }).prefix('/api').middleware(['auth'])







  Route.post('/category', 'CategoriesController.store')
  Route.get('/category', 'CategoriesController.index')
  Route.put('/category/:id', 'CategoriesController.update')
  Route.delete('/category/:id', 'CategoriesController.destroy')

  Route.post('/admin', 'AdminsController.store')
  Route.get('/admin', 'AdminsController.index')
  Route.put('/admin/:id', 'AdminsController.update')
  Route.delete('/admin/:id', 'AdminsController.destroy')