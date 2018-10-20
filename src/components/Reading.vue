<template>
  <div class="page">
    <!-- <input class="input" v-model="part" placeholder="part"> -->
    <select class="select" v-model="part" >
      <option value="reading">阅读</option>
      <option value="listening">听力</option>
      <option value="leci">乐词</option>
    </select>
    <input class="input" v-model="num" placeholder="num">
    <br>
    <br>
    <!-- <br>
    覆盖单词<input type="checkbox" :checked='defaultCover.word'>
    覆盖翻译<input type="checkbox" :checked='defaultCover.translation'>
    <br>
    <br> -->
    <h1 class="word" :class="cover.word ? 'cover' : ''" @click="openWordCover">{{word.word}}</h1>
    <p class="translation" :class="cover.translation ? 'cover' : ''" @click="openTranslateCover">{{word.translation}}</p>
    <audio :src='audioUrl' autoplay controls></audio>
    <br>
    <br>
    <button class="next" @click="getWord">NEXT</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Reading",
  data() {
    return {
      message: "Hello Vue!",
      part: "reading",
      num: 0,
      word: {
        word: "",
        translation: ""
      },
      audioUrl: "",
      cover: {
        word: false,
        translation: true
      },
      defaultCover: {
        word: false,
        translation: true
      }
    };
  },
  mounted() {
    this.getWord();
  },
  methods: {
    getWord() {
      axios
        .get("/word", {
          params: { part: this.part, num: this.num }
        })
        .then(res => {
          if (res.data.code == 0) {
            alert(res.data.msg)
          } else if (res.data.code == 1) {
            this.cover.word = this.defaultCover.word;
            this.cover.translation = this.defaultCover.translation;
            this.word = res.data.word;
            this.audioUrl = res.data.wordUrl;
          }
        });
    },
    openTranslateCover() {
      this.cover.translation = false;
    },
    openWordCover() {
      this.cover.word = false;
    }
  }
};
</script>
<style scoped>
.page {
  justify-content: center;
  align-items: center;
}

.select {
  width: 130px;
  height: 30px;
  border: 1px solid black;
  border-radius: 0;
  padding: 0 5px;
  background: #fff;
}

.input {
  width: 120px;
  height: 28px;
  border: 1px solid black;
  border-radius: 0;
  padding: 0 5px;
  background: #fff;
}
.next {
  width: 120px;
  height: 44px;
  border-radius: 22px;
  border: 1px solid black;
  background: #fff;
}

.word {
  height: 60px;
  line-height: 60px;
  margin: 0;
}

.translation {
  height: 60px;
  line-height: 60px;
  margin: 0;
}

.cover {
  background: #2c3e50;
  border: 1px solid black;
}

audio {
  margin: 15px 0;
}
</style>
