export class Product {

  constructor (params) {
      const {
        id,
        name,
        price,
        img,
    quantity
    } = params
    this.id = id
    this.name = name
    this.price = price
    this.img = `./assets/${img}`
    this.quantity = quantity
    this.total=0
  }
}