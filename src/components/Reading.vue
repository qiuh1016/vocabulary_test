<template>
  <div class="page">
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
        word: true,
        translation: true
      }
    };
  },
  mounted() {
    this.getWord()
  },
  methods: {
    getWord() {
      axios.get("/word", {
          params: { part: 'listening', num: 2 },
        }).then(res => {
        this.cover.word = this.defaultCover.word
        this.cover.translation = this.defaultCover.translation
        this.word = res.data.word
        this.audioUrl = res.data.wordUrl
      });
    },
    openTranslateCover() {
      this.cover.translation = false
    },
    openWordCover() {
      this.cover.word = false
    }
  }
};
</script>
<style scoped>
  .page {
    justify-content: center;
    align-items: center;
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
