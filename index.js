const historyApiFallback = require('express-history-api-fallback')
const express = require('express')
const app = express()
app.disable('x-powered-by')
const root = `${__dirname}/dist`

app.use(express.static(root))
app.use(historyApiFallback('index.html', { root }))
app.listen(process.env.PORT || 3000)
