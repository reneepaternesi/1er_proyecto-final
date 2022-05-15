<template>
  <div id="app">
    <NavBar :itemsAdded="getItemsAdded()" />
    <b-container class="product-layout p-5">
      <b-row class="justify-content-center">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </b-row>
    </b-container>
    <CartModal :cart="cart" @remove-from-cart="removeFromCart" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ProductSrv from "./services/products.service";
import { Product } from "./models/product";
import ProductCard from "./components/products/ProductCard.vue";
import CartModal from "./components/cart/CartModal.vue";

export default {
  name: "App",
  data: () => ({
    products: [],
    cart: [],
  }),
  components: { NavBar, ProductCard, CartModal },
  mounted() {
    this.setProducts();
  },
  methods: {
    async setProducts() {
      const items = await ProductSrv.get();
      const products = items.map(
        (item, index) =>
          new Product({
            ...item,
            _id: index,
            identificador: `product-${index}`,
          })
      );
      this.products = products;
      return products;
    },
    addToCart(productId) {
      const productInCart = this.cart.find(
        (product) => product.id === productId
      );

      if (productInCart) {
        productInCart.quantity++;
        productInCart.total = productInCart.quantity * productInCart.price;
      } else {
        const newProduct = this.products.find(
          (product) => product.id === productId
        );

        this.cart.push({
          ...newProduct,
          quantity: 1,
          total: newProduct.price,
        });
      }
      this.$bvModal.msgBoxOk("Ya agregamos el producto al carrito", {
        title: "",
        size: "sm",
        buttonSize: "sm",
        okVariant: "secondary",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    removeFromCart(productId) {
      const productInCart = this.cart.find(
        (product) => product.id === productId
      );
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        this.cart = this.cart.filter((p) => {
          return p.id != productId;
        });
      }
    },
    getItemsAdded() {
      var totalItems = this.cart.reduce(function (res, item) {
        return res + item.quantity;
      }, 0);
      return totalItems;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300&family=Satisfy&display=swap");

#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
