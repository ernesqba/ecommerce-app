import * as service from './service.js'
import * as utils from './utils.js'

if (!utils.getUserToken()) location.href = 'login'

$(document).ready(async () => {
  let categoryId = 0

  await showCategories()
  await showProducts(categoryId)
  await showCartProducts()

  $('#categories').on('click', '.card', async function () {
    categoryId = $(this).data('category-id')
    await showProducts(categoryId)
    await showCartProducts()
  })

  $('#products').on('click', '.btn', async function (event) {
    event.preventDefault()
    const productId = $(this).data('product-id')
    const products = await service.getProducts()
    const product = products.find((product) => product.id == productId)
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) ?? {}
    cartProducts[productId] = (cartProducts[productId] ?? 0) + 1
    if (cartProducts[productId] >= product.stock) {
      $(`#products .card[data-product-id="${productId}"`).addClass('out-of-stock')
      $(`#products .btn[data-product-id="${productId}"`).prop('disabled', true)
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    await showCartProducts()
  })

  $('#shopping-cart').on('click', '.btn', async function (event) {
    event.preventDefault()
    const productId = $(this).data('product-id')
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    cartProducts[productId] = (cartProducts[productId] ?? 0) - 1
    if (cartProducts[productId] <= 0) delete cartProducts[productId]
    $(`#products .card[data-product-id="${productId}"`).removeClass('out-of-stock')
    $(`#products .btn[data-product-id="${productId}"`).prop('disabled', false)
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    await showCartProducts()
  })

  $('#buy-products').on('click', async function (event) {
    event.preventDefault()
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    if (!cartProducts || !Object.keys(cartProducts).length) return alert('No products to buy')
    const purchasedProducts = Object.keys(cartProducts).map((productId) => ({
      id: productId,
      purchasedStock: cartProducts[productId],
    }))
    try {
      await service.purchasedProducts(purchasedProducts)
    } catch (error) {
      return alert(error.message)
    }
    localStorage.removeItem('cartProducts')
    await showProducts(categoryId)
    await showCartProducts()
    alert('Products purchased')
  })
})

const showCategories = async () => {
  const categories = await service.getCategories()
  categories.forEach(function (category) {
    $('#categories').append(
      `<div class="col-12">
        <div class="card h-100 category-card" data-category-id="${category.id}">
          <div class="card-body">
            <h5 class="card-title">${category.name}</h5>
          </div>
        </div>
      </div>`,
    )
  })
}

const showProducts = async (categoryId = 0) => {
  const products = await service.getProducts(categoryId)
  $('#categories').each(() => {
    $('.category-card').each(function () {
      const id = $(this).data('category-id')
      if (id === categoryId) $(this).addClass('category-card-selected')
      else $(this).removeClass('category-card-selected')
    })
  })

  $('#products').empty()
  products.forEach((product) => {
    $('#products').append(
      `<div class="col-lg-4 col-md-6 mb-3">
          <div class="card h-100${product.stock ? '' : ' out-of-stock'}" data-product-id="${
        product.id
      }"> <!-- Add h-100 class to make the card take full height -->
          <img src="${product.image}" class="card-img-top product-image same-size-image" alt="${product.name}" />
            <div class="card-body d-flex flex-column" style="height: 20em; overflow: auto;"> <!-- Set fixed height and overflow property -->
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><small class="text-muted">Code: ${product.code}</small></p>
              <p class="card-text">Price: ${product.price}</p>
              <p class="card-text">Stock: ${product.stock}</p>
              <button class="btn btn-primary mt-auto" data-product-id="${
                product.id
              }">Add to cart</button> <!-- Add mt-auto to push the button to the bottom -->
            </div>
          </div>
        </div>
        `,
    )
  })
}

const showCartProducts = async () => {
  $('#shopping-cart').empty()

  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) ?? {}
  const products = await service.getProducts()

  Object.keys(cartProducts).forEach((productId) => {
    const product = products.find((product) => product.id == productId)

    if (product && cartProducts[productId] >= product.stock) {
      $(`#products .card[data-product-id="${productId}"`).addClass('out-of-stock')
      $(`#products .btn[data-product-id="${productId}"`).prop('disabled', true)
    }
  })

  const productsToPaint = Object.keys(cartProducts).map((cartProduct) => {
    const product = products.find((product) => product.id == cartProduct)
    return { ...product, purchasedStock: cartProducts[cartProduct] }
  })

  let productsCount = 0
  let productsCost = 0

  productsToPaint.forEach((product) => {
    productsCount += product.purchasedStock
    productsCost += product.price * product.purchasedStock
    $('#shopping-cart').append(
      `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <img src="${product.image}" class="product-image" alt="${product.name}" style="width: 50px; height: 50px;" />
        <span>${product.name}</span>
        <div class="d-flex align-items-center">
          <span class="badge bg-primary rounded-pill" style="margin-right: 0.5em;">${product.purchasedStock}</span>
          <button class="btn btn-primary btn-sm" data-product-id="${product.id}"><i class="fas fa-trash"></i></button>
        </div>
      </li>
      `,
    )
  })

  $('#cart-item-count').text(productsCount)
  $('#cart-total-price').text(productsCost.toFixed(2))
}
