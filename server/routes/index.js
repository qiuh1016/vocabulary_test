const router = require('koa-router')()
const util = require('./util/util')

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/word', async (ctx, next) => {
  let part = ctx.query.part || 'reading'
  let num = ctx.query.num || 1
  let words = require(`../vocabulary/${part}/${part}${num}`)

  let random = util.randomNumber(0, words.length - 1)
  let word = words[random]
  ctx.body ={
    word: word,
    wordUrl: `http://dict.youdao.com/dictvoice?audio=${word.word}`
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


module.exports = router
