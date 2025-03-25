const express = require('express')
const webpack = require('webpack')
// const webpackConfigMiddleware = require('webpack-dev-middleware')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const createError = require('http-errors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
// const config = require('../webpack.config')
// const compiler = webpack(config)

const authRouter = require('./routes/authRoute')

// Configuration DB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection error:', err))
// app.use(
//   webpackConfigMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     writeToDisk: true,
//   })
// )

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})
// Routes
app.use('/api/auth', authRouter)

// Serveur des fichiers static en production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../dist')

  // Serveur des assets statiques
  app.use(express.static(distPath))

  // Gestion du routing client-side
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

// Error Handling
app.use((req, res, next) => {
  next(createError.NotFound())
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log('App listening on port: ' + port)
})
