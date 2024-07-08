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
//Admin Endpoints......
Route.post('/admins/register', 'AdminsController.register')
Route.post('/admins/login', 'AdminsController.login')
Route.group(() => {
  Route.get('/admins', 'AdminsController.index')
  Route.put('/admins/:id', 'AdminsController.update')
  Route.delete('/admins/:id', 'AdminsController.destroy')

  Route.get('/suppliers', 'SuppliersController.index')
  Route.put('/suppliers/:id', 'SuppliersController.update')
  Route.delete('/suppliers/:id', 'SuppliersController.destroy')

  Route.get('/resellers', 'ResellersController.index')
  Route.delete('/resellers/:id', 'ResellersController.destroy')

  Route.post('/categories', 'CategoriesController.store')
  Route.put('/categories/:id', 'CategoriesController.update')
  Route.delete('/categories/:id', 'CategoriesController.destroy')

  Route.get('/orders', 'OrdrersController.index')
  Route.put('/orders/:id', 'OrdrersController.update')
}).prefix('/api').middleware(['auth:api_admin'])

//Supplier Endpoints......
Route.post('/suppliers/register', 'SuppliersController.register')
Route.post('/suppliers/login', 'SuppliersController.login')

Route.group(() => {
  Route.post('supplier/logout', 'SuppliersController.logout')

  Route.post('/products', 'ProductsController.store')
  Route.patch('/products/:id', 'ProductsController.update')
  Route.delete('/products/:id', 'ProductsController.destroy')
  Route.get('/products/supplier', 'ProductsController.getBySupplier')

  Route.get('/orders/supplier', 'OrdrersController.getBySupplier')

  Route.get('/categories', 'CategoriesController.index')
}).prefix('/api').middleware(['auth:api_supplier'])

//Reseller Endpoints......
Route.post('/resellers/register', 'ResellersController.register')
Route.post('/resellers/login', 'ResellersController.login')
Route.group(() => {
  Route.post('/reseller/logout', 'ResellersController.logout')
  Route.put('/resellers/:id', 'ResellersController.update')
  Route.get('/getorders', 'OrdrersController.dispatch')

  //Order API's
  Route.post('/orders', 'OrdrersController.store')
  Route.delete('/orders/:id', 'OrdrersController.destroy')

  //Address API's
  Route.post('/addresses', 'AddressesController.store')
  Route.get('/addresses', 'AddressesController.index')
  Route.put('/addresses/:id', 'AddressesController.update')
  Route.delete('/addresses/:id', 'AddressesController.destroy')

  Route.get('/products/search', 'ProductsController.search')
  Route.get('/products', 'ProductsController.index')
  Route.get('/products/category/:id', 'ProductsController.getByCategory')

  Route.get('/orders/reseller', 'OrdrersController.getByReseller')
}).prefix('/api').middleware(['auth:api_reseller'])




