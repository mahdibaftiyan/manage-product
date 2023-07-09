let Products = getSaveProduct()

const filters = {
    inputsearch: '',
    avilable: false,
    sortBy: 'byEdited'
}

renderProduct(Products, filters)

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    Products.push({
        id: id,
        Title: e.target.elements.addproduct.value,
        exist: true,
        Price: 0,
        created: timeStamp,
        updated: timeStamp
    })
    e.target.elements.addproduct.value = ''
    saveProduct(Products)
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
    Products = []
    renderProduct(Products, filters)
})

document.querySelector('#sort').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderProduct(Products, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'Products') {
        Products = JSON.parse(e.newValue)
        renderProduct(Products, filters)
    }
})