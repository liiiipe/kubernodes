import { createServer } from "node:http"

const hostname = '127.0.0.1'
const port = process.argv[2]

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá, mundo!');
})

server.listen(port, hostname, () => {
  console.log(`Servidor em execução em http://${hostname}:${port}`)
})

const randomMs = Math.random() * 10 * 1000 + 5000
const generateError = () => {
  const secs = randomMs / 1000
  console.log(`Servidor em execução em http://${hostname}:${port} deu erro e foi encerrado com duração de ${secs.toFixed(1)} segundos!`)
  process.exit(1)
}

setTimeout(generateError, randomMs)