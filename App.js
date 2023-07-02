let Products = []


const productJson = JSON.parse(localStorage.getItem('Products'))
if (productJson !== null) {
    Products = productJson
}

const filters = {
    inputsearch: '',
    avilable: false
}


const renderProduct = (cart, filter) => {

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
        const productEL = document.createElement('p')
        productEL.textContent = item.Title
        document.querySelector('.showProduct').appendChild(productEL)
    })
}

renderProduct(Products, filters)


document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    Products.push({
        Title: e.target.elements.addproduct.value,
        exist: true
    })
    localStorage.setItem('Products', JSON.stringify(Products))
    e.target.elements.addproduct.value = ''
    renderProduct(Products, filters)

})


document.querySelector('#search').addEventListener('input', (e) => {
    filters.inputsearch = e.target.value
    renderProduct(Products, filters)
})

document.querySelector('#avilable').addEventListener('change', (e) => {
    filters.avilable = e.target.checked
    renderProduct(Products, filters)
})


document.querySelector('#remove-all-product').addEventListener('click', () => {
    localStorage.clear()
    renderProduct(Products, filters)
})
