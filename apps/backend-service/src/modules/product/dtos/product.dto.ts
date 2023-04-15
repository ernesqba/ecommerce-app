export class ProductCreateDto {
  categoryId?: number
  name?: string
  description?: string
  code?: string
  image?: string
  price?: number
  stock?: number
}

export class ProductDto extends ProductCreateDto {
  id: number
}

export class ProductFilterDto {
  categoryId?: number
}

export class PurchasedProductDto {
  id: number
  purchasedStock: number
}

export class PurchasedProductListDto {
  list: PurchasedProductDto[]
}
