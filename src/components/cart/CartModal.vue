<template>
  <b-modal
    id="cart"
    title="Tu Carrito"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <TableComponent :cart="cart" @remove-from-cart="removeFromCart" />
    <template #modal-footer="{ ok, cancel }">
      <b-button size="sm" variant="success" @click="ok()">
        Confirmar Compra
      </b-button>
      <b-button size="sm" variant="secondary" @click="cancel()">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { Product } from "../../models/product";
import TableComponent from "./TableComponent.vue";

export default {
  name: "CartModal",
  components: { TableComponent },
  props: {
    cart: {
      type: Array[Product],
      required: true,
    },
  },
  methods: {
    removeFromCart(productId) {
      this.$emit("remove-from-cart", productId);
    },
  },
};
</script>

<style></style>
