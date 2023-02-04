import axios from 'axios'
import express from 'express'
import { JSDOM } from 'jsdom'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/getOgp', async (req, res) => {
  const url = req.query.url
  try {
    const resData = await axios.get(url)
    const dom = new JSDOM(resData.data)
    const metaElements = dom.window.document.head.querySelectorAll('meta')
    const result = {}
    Array.from(metaElements)
      .filter((element) => {
        return element.hasAttribute('property')
      })
      .forEach((element) => {
        const name = element.getAttribute('property').replace('og:', '')
        const content = element.getAttribute('content')
        result[name] = content
      })
    res.send(result)
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

export default app
