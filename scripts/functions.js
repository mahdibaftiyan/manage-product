const getSaveProduct = () => {
    const productsJson = localStorage.getItem('Products')
    if (productsJson !== null) {
        return JSON.parse(productsJson)
    }
    else {
        return []
    }
}

const saveProduct = (product) => {
    localStorage.setItem('Products', JSON.stringify(product))
}

const removeProduct = (cart, product) => {
    const findIndexValue = cart.findIndex((item) => {
        return item.id == product.id
    })

    cart.splice(findIndexValue, 1)
}

const toggleproduct = (id) => {
    const product = Products.find((item) => {
        return item.id == id
    })
    if (product !== undefined) {
        product.exist = !product.exist
    }
}

const sortProducts = (cart, sort) => {
    if (sort === 'byEdited') {
        return cart.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            }
            else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sort === 'bycreated') {
        return cart.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            }
            else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    }
    else {
        return cart
    }
}

const renderProduct = (cart, filter) => {
    cart = sortProducts(cart, filter.sortBy)
    let carts = cart.filter((item) => {
        return item.Title.toUpperCase().includes(filter.inputsearch.toUpperCase())
    })

    carts = carts.filter((item) => {
        if (filter.avilable) {
            return item.exist
        }
        else {
            return true
        }
    })

    document.querySelector('.showProduct').innerHTML = ''

    carts.forEach((item) => {


        document.querySelector('.showProduct').appendChild(createProductDom(item))
    })
}

const createProductDom = (product) => {
    const productEL = document.createElement('p')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('span')
    const removeBtn = document.createElement('button')
    const editProduct = document.createElement('a')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = !product.exist
    checkbox.addEventListener('change', (e) => {
        toggleproduct(product.id)
        saveProduct(Products)
        renderProduct(Products, filters)
    })
    productEL.appendChild(checkbox)

    productItem.textContent = product.Title
    productEL.appendChild(productItem)

    editProduct.textContent = 'ویرایش'
    editProduct.setAttribute('href', `../pages/edit-product.html#${product.id}`)
    productEL.appendChild(editProduct)


    removeBtn.textContent = 'remove'
    productEL.appendChild(removeBtn)
    removeBtn.addEventListener('click', (e) => {
        removeProduct(Products, product)
        saveProduct(Products)
        renderProduct(Products, filters)
    })
    return productEL
}


const lastEditMessage = (timeStamp) => {
    return `last edit : ${moment(timeStamp).locale('fa').fromNow()}`
}