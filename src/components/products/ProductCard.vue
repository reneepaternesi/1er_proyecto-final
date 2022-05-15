<template>
  <div class="col-4">
    <b-card
      :title="product.name"
      :img-src="product.img"
      :img-alt="product.name"
      img-top
      tag="article"
      class="mb-4 shadow-lg"
    >
      <b-card-text>
        {{ getCurrency(product.price) }}
      </b-card-text>
      <b-button
        class="add-to-cart shadow"
        href="#"
        :disabled="product.quantity === 0"
        @click="addToCart"
        >{{ product.quantity === 0 ? "No Disponible" : "Comprar" }}</b-button
      >
    </b-card>
  </div>
</template>

<script>
import { Product } from "../../models/product";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Product,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product.id);
    },
  },
};
</script>

<style scoped lang="less">
.card {
  &:hover {
    opacity: 60%;
  }

  .card-body {
    .card-title {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 16px;
      text-shadow: 2px 2px 8px #6c757d;
    }

    .add-to-cart {
      background-color: #6c757d;
      text-transform: uppercase;
      border: none;

      &:hover {
        background-color: #d0dede;
        font-weight: bold;
        color: #6c757d;
        border: none;
      }
    }
  }
}
</style>
