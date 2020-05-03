import express from 'express'
import { rootHandler, helloHandler, fooHandler } from './handlers'

const app = express()
const port = process.env.PORT || '8000'

app.get('/', rootHandler)
app.get('/hello/:name', helloHandler)
app.get('/foo', fooHandler)

app.listen(port, err => {
  if (err) return console.error(err)
  return console.log(`Server is listening on ${port}`)
});
