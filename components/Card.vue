<template>
  <div class="card border-secondary mb-3" style="max-width: 28rem;" @click="show(card.id)">
    <div class="card-header">Question {{ card.id }}</div>
    <div class="card-body text-secondary">
      <h5 class="card-title">{{ card.question }}</h5>
      <p class="card-text" :id="card.id" style="visibility: hidden">{{ card.answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
  },
  methods: {
    show(id) {
      document.getElementById(id).style.visibility === "hidden" ? document.getElementById(id).style.visibility = "visible" : document.getElementById(id).style.visibility = "hidden";
    }
  }
}
</script>

<style scoped>

</style>
