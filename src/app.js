const Koa = require('koa');
const koaBody = require('koa-body');


const app = module.exports = new Koa();

app.use(koaBody({ multipart: true }));

app.use(async function(ctx) {
    ctx.body = 'secret';
  });


app.use(async function(ctx) {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  });
  
  // demarrer l'application
  if (!module.parent) app.listen(3000);