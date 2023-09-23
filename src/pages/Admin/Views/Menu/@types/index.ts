export interface IProduct {
  productId: string
  productImage: string
  productName: string
  productPrice: number
  productDescription: string
}

export interface ICategory {
  id: string
  name: string
  products: IProduct[]
}
