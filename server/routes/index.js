const router = require('koa-router')()
const util = require('./util/util')

let map = {}

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/word', async (ctx, next) => {
  let part = ctx.query.part || 'reading'
  let num = ctx.query.num || 1
  let words = require(`../vocabulary/${part}/${num}`)

  if (!map[part + num]) {
    map[part + num] = []
  } else if (map[part + num].length == words.length) {
    map[part + num] = []
    return ctx.body = {
      code: 0,
      msg: '一遍已完成'
    }
  }

  let random = util.randomNumber(0, words.length - 1)
  while (map[part + num].indexOf(random) != -1) {
    random = util.randomNumber(0, words.length - 1)
  }
  map[part + num].push(random)

  console.log(random)
  let word = words[random]
  ctx.body = {
    code: 1,
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
