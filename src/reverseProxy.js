import { createServer } from "node:http"
import { selectServer } from "./loadBalancer"

const hostname = '127.0.0.1'
const port = 8080

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const server = selectServer()
  if (server === undefined) {
    res.statusCode = 400
    res.end('Os servidores estão indisponíveis no momento!')
  }
  else {
    res.writeHead(302, {'Location': `http://${hostname}:${server.port}`});
    res.end();
  }
})

server.listen(port, hostname, () => {
  console.log(`Servidor proxy reverso em execução em http://${hostname}:${port}`)
})