import * as service from './service.js'
import * as utils from './utils.js'

if (!utils.getUserToken()) location.href = 'login'
if (!utils.shouldDisplayFeatures()) location.href = 'home'

$(document).ready(async () => {
  await showCategories()
  await showProducts()

  $('#close-category-modal-b1, #close-category-modal-b2').on('click', function () {
    $('#addCategoryModal').modal('hide')
  })

  $('#add-category').on('click', function () {
    $('#category-id').val(undefined)
    $('#category-name').val(undefined)
    $('#addCategoryModal').modal('show')
  })

  $('#save-category').on('click', async function () {
    const categoryId = $('#category-id').val()
    const categoryName = $('#category-name').val()

    try {
      if (categoryName) {
        $('#addCategoryModal').modal('hide')
        if (categoryId) await service.updateCategory({ id: categoryId, name: categoryName })
        else await service.createCategory({ name: categoryName })
      } else {
        alert('Please enter a category name')
      }
      await showCategories()
    } catch (error) {
      console.log(error)
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
    }
  })

  $('#categories-table').on('click', '.btn', async function () {
    const categoryId = $(this).data('category-id')

    try {
      if ($(this).hasClass('btn-danger')) {
        await service.deleteCategory({ id: categoryId })
      } else {
        const categories = await service.getCategories()
        const category = categories.find((category) => category.id === categoryId)

        $('#category-id').val(category.id)
        $('#category-name').val(category.name)

        $('#addCategoryModal').modal('show')
      }
      await showCategories()
      await showProducts()
    } catch (error) {
      console.log(error)
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
    }
  })

  $('#close-product-modal-b1, #close-product-modal-b2').on('click', function () {
    $('#addProductModal').modal('hide')
  })

  $('#add-product').on('click', async function () {
    $('#product-id').val(undefined)
    $('#product-name').val(undefined)
    $('#product-description').val(undefined)
    $('#product-code').val(undefined)
    $('#product-image').val(undefined)
    $('#product-price').val(undefined)
    $('#product-stock').val(undefined)
    await showCategoriesSelector()
    $('#addProductModal').modal('show')
  })

  $('#save-product').on('click', async function () {
    const productId = $('#product-id').val()
    const productName = $('#product-name').val()
    const productDescription = $('#product-description').val()
    const productCode = $('#product-code').val()
    const productImage = $('#product-image').val()
    const productPrice = $('#product-price').val()
    const productStock = $('#product-stock').val()
    const productCategoryId = $('#product-category').val()

    try {
      if (productName && productName && productPrice && productStock && productCategoryId) {
        $('#addProductModal').modal('hide')
        const product = {
          id: productId,
          name: productName,
          description: productDescription,
          code: productCode,
          image: productImage,
          price: productPrice,
          stock: productStock,
          categoryId: productCategoryId,
        }

        if (productId) await service.updateProduct(product)
        else await service.createProduct({ ...product, id: undefined })
      } else {
        alert('Please enter valid product data')
      }
      await showProducts()
    } catch (error) {
      console.log(error)
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
    }
  })

  $('#products-table').on('click', '.btn', async function () {
    const productId = $(this).data('product-id')

    try {
      if ($(this).hasClass('btn-danger')) {
        await service.deleteProduct({ id: productId })
      } else {
        const products = await service.getProducts()
        const product = products.find((product) => product.id === productId)

        await showCategoriesSelector()

        $('#product-id').val(product.id)
        $('#product-name').val(product.name)
        $('#product-description').val(product.description)
        $('#product-code').val(product.code)
        $('#product-image').val(product.image)
        $('#product-price').val(product.price)
        $('#product-stock').val(product.stock)
        $('#product-category-id').val(product.categoryId)


        $('#addProductModal').modal('show')
      }
      await showProducts()
    } catch (error) {
      console.log(error)
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
    }
  })
})

async function showCategories() {
  const categories = await service.getCategories(false)

  $('#categories-table tbody').empty()
  categories.forEach(function (category) {
    $('#categories-table tbody').append(
      `
      <tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td class="align-top">
          <div class="d-flex justify-content-end">
            <button class="btn btn-warning btn-sm" data-category-id="${category.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm" data-category-id="${category.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
    )
  })
}

async function showProducts() {
  const products = await service.getProducts()
  const categories = await service.getCategories()

  products.forEach(product => {
    product.category = {
      name: categories.find(category => category.id === product.categoryId)?.name
    }
  })

  $('#products-table tbody').empty()
  products.forEach(function (product) {
    $('#products-table tbody').append(
      `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.category?.name ?? product.categoryId}</td>
        <td class="align-top">
          <div class="d-flex justify-content-end">
            <button class="btn btn-warning btn-sm" data-product-id="${product.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm" data-product-id="${product.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`,
    )
  })
}

async function showCategoriesSelector() {
  const categories = await service.getCategories(false)
  const productCategorySelect = $('#product-category')

  categories.forEach(function (category) {
    const option = $('<option></option>').attr('value', category.id).text(category.name)
    productCategorySelect.append(option)
  })
}
