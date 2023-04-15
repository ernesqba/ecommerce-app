const backendUrl = 'http://localhost:3000'

export function createCategory(category) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/category',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      data: JSON.stringify(category),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function getCategories(allCategories = true) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/category',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      success: function (categories) {
        if (allCategories) categories.unshift({ id: 0, name: 'All categories' })
        return resolve(categories)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus)
        return reject(textStatus)
      },
    })
  })
}

export function updateCategory(category) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + `/api/v1/category/${category.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      data: JSON.stringify(category),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function deleteCategory(category) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + `/api/v1/category/${category.id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function createProduct(product) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/product',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      data: JSON.stringify(product),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function getProducts(categoryId = 0) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/product' + (categoryId ? `?categoryId=${categoryId}` : ''),
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      success: function (products) {
        return resolve(products)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus)
        return reject(textStatus)
      },
    })
  })
}

export function updateProduct(product) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + `/api/v1/product/${product.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      data: JSON.stringify(product),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function deleteProduct(product) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + `/api/v1/product/${product.id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}


export function purchasedProducts(purchasedProducts) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/product/purchased',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('session'))?.session?.token,
      },
      data: JSON.stringify({
        list: purchasedProducts,
      }),
      contentType: 'application/json',
      success: function (products) {
        return resolve(products)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/auth/login',
      method: 'POST',
      data: JSON.stringify({ email, password }),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}

export function signup(email, password) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: backendUrl + '/api/v1/auth/signup',
      method: 'POST',
      data: JSON.stringify({ email, password }),
      contentType: 'application/json',
      success: function (data) {
        return resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON)
        return reject(jqXHR.responseJSON)
      },
    })
  })
}
