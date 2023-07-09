const titleEl = document.getElementById('productTitle')
const priceEl = document.getElementById('productPrice')
const dateEl = document.getElementById('lastEdit')

const productId = location.hash.substring(1)
let products = getSaveProduct()
let product = products.find((item) => {
    return item.id === productId
})

if (product === undefined) {
    location.assign('../index.html')
}

titleEl.value = product.Title
priceEl.value = product.Price
dateEl.textContent = lastEditMessage(product.updated)

titleEl.addEventListener('input', (e) => {
    product.Title = e.target.value
    product.updated = moment().valueOf()
    dateEl.textContent = lastEditMessage(product.updated)
    saveProduct(products)
})
priceEl.addEventListener('input', (e) => {
    product.Price = e.target.value
    product.updated = moment().valueOf()
    dateEl.textContent = lastEditMessage(product.updated)
    saveProduct(products)
})

document.getElementById('productRemove').addEventListener('click', (e) => {
    removeProduct(products, product)
    saveProduct(products)
    location.assign('../index.html')
})


window.addEventListener('storage', (e) => {
    if (e.key === 'Products') {
        products = JSON.parse(e.newValue)
        let product = products.find((item) => {
            return item.id === productId
        })
        if (product === undefined) {
            location.assign('../index.html')
        }
        titleEl.value = product.Title
        priceEl.value = product.Price
        dateEl.textContent = lastEditMessage(product.updated)
    }
})