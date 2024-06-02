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
Route.post('/login' , 'SuppliersController.login').middleware('auth.supplier')
  Route.group(() => {

  Route.post('/supplier', 'SuppliersController.store')
  Route.get('/supplier', 'SuppliersController.index')
  Route.put('/supplier/:id', 'SuppliersController.update')
  Route.delete('/supplier/:id', 'SuppliersController.destroy')
  Route.post('/logout' , 'SuppliersController.logout')

  Route.post('/product', 'ProductsController.store')
  Route.get('/product', 'ProductsController.index')
  Route.put('/product/:id', 'ProductsController.update')
  Route.delete('/product/:id', 'ProductsController.destroy')

  Route.post('/category', 'CategoriesController.store')
  Route.get('/category', 'CategoriesController.index')
  Route.put('/category/:id', 'CategoriesController.update')
  Route.delete('/category/:id', 'CategoriesController.destroy')
  })


  Route.group(() => {

  Route.post('/reseller', 'ResellersController.store')
  Route.get('/reseller', 'ResellersController.index')
  Route.put('/reseller/:id', 'ResellersController.update')
  Route.delete('/reseller/:id', 'ResellersController.destroy')

  Route.post('/address', 'AddressesController.store')
  Route.get('/address', 'AddressesController.index')
  Route.put('/address/:id', 'AddressesController.update')
  Route.delete('/address/:id', 'AddressesController.destroy')

  })
  Route.post('/admin', 'AdminsController.store')
  Route.get('/admin', 'AdminsController.index')
  Route.put('/admin/:id', 'AdminsController.update')
  Route.delete('/admin/:id', 'AdminsController.destroy')