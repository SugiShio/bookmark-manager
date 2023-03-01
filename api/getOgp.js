import axios from 'axios'
import { JSDOM } from 'jsdom'

export default async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const param = url.searchParams.get('url')

  try {
    const resData = await axios.get(param)
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
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(result), 'utf8')
  } catch (error) {
    const status = error.response && error.response.status
    res.writeHead(status).end()
  }
}
