const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  ctx.body = 'XXXXXXX';
});

app.use(async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.set('WWW-Authenticate', 'Basic');
        ctx.body = 'cant haz that';
      } else {
        throw err;
      }
    }
});

app.use(auth({ name: 'moi', pass: 'moi' }));

// secret response

app.use(async function(ctx) {
  ctx.body = 'secret';
});


const koaBody = require('koa-body');
app.use(koaBody({ multipart: true }));

// declaration et utilisation d'une fonction qui retournera Hello-World
app.use(async function(ctx) {
  // ctx.body c'est le contenu
  // const body = ctx.request.body;
  // console.log(body)
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  // ctx.body = 'Hello-World-Test2';
});

// demarrer l'application
if (!module.parent) app.listen(3000);