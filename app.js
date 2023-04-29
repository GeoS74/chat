const Koa = require('koa')
const {koaBody} = require('koa-body')
const serve = require('koa-static')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const subscribers = new Map()

router.get('/subscribe', async ctx => {
  const id = Math.random();
  
  const message = await new Promise(res => {
    subscribers.set(id, res)

    ctx.req.on('close', () => {
      subscribers.delete(id)
      res()
    })
  })

  ctx.status = 200;
  ctx.body = message;
})

router.post('/publish', koaBody(), ctx => {
  for(const sub of subscribers.values()){
    sub(ctx.request.body.message)
  }

  ctx.status = 200;
})

app.use(serve('client'))
app.use(router.routes())

module.exports = app;
