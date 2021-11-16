const express = require('express');
const session = require('express-session');
const path = require('path');
const abtest = require('easy-abtest');

const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const app = express();
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { maxAge: 60000 }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');
app.use(express.json());


let options = {
  enabled: true,
  name: 'dog-butt',
  buckets: [
    { variant: 0, weight: 0.50 },
    { variant: 1, weight: 0.50 }
  ]
}

app.use(abtest(options));


app.set('view engine', 'pug');
app.use('/', indexRouter);
app.use('/api', apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
