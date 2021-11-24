<template>
  <div class="m-3">
    <div class="mb-3">
      <label for="questionField" class="form-label">Question</label>
      <input id="questionField" class="form-control" placeholder="Question" v-model="question"/>
    </div>
    <div class="mb-3">
      <label for="answerField" class="form-label">Answer</label>
      <input id="answerField" class="form-control" placeholder="Answer" v-model="answer"/>
    </div>
    <button class="btn btn-primary mb-4" :disabled="isDisabled" @click="add">Add</button>
    <ul class="list-group list-group-flush text-center">
      <Card v-for="questions in cards" :key="questions.id"
             :card="questions"/>
    </ul>
  </div>
</template>

<script>
import Card from "../components/Card";

let num = 1;
export default {
  name: "FlashPage",
  components: {Card},
  data() {
    return {
      question: "",
      answer: "",
      cards: []
    }
  },
  methods: {
    add() {
      this.cards.push({
        id: num,
        question: this.question,
        answer: this.answer
      })
      this.question = "";
      this.answer = "";
      num++;
    },

  },
  computed: {
    isDisabled() {
      return !(this.question && this.answer)
    }
  }
}
</script>

<style scoped>

</style>
