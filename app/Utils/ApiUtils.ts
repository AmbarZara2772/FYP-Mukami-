//import { generateSupplierId } from 'App/Utils/ApiUtils';
// import { Supplier } from 'App/Models/Supplier';
export function Response(data: any){
    return{
        status: 200,
        count: Array.isArray(data) ? data.length : 1,
        data: data
    }
}

export function generateSupplierId(Supplier_id) {
    const timestamp = Date.now().toString(36)
    const supplierId = `SUP${Supplier_id}-${timestamp}`
    return supplierId.toUpperCase()
  }

  export function generateProductId(Product_id) {
    const timestamp = Date.now().toString(36)
    const productId = `PRO${Product_id}-${timestamp}`
    return productId.toUpperCase()
  }

  export function generateCategoryId(Category_id) {
    const timestamp = Date.now().toString(36)
    const categoryId = `CAT${Category_id}-${timestamp}`
    return categoryId.toUpperCase()
  }

  export function generateResellerId(Reseller_id) {
    const timestamp = Date.now().toString(36)
    const resellerId = `RES${Reseller_id}-${timestamp}`
    return resellerId.toUpperCase()
  }

  export function generateOrderId(Order_id) {
    const timestamp = Date.now().toString(36)
    const orderId = `${Order_id}-${timestamp}`
    return orderId.toUpperCase()
  }