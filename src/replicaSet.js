import { spawn } from 'node:child_process'

const INSTANCES = 3
const INITIAL_PORT = 3000

let port = INITIAL_PORT
const upInstance = () => {

  const cp = spawn('node', ['server.js', `${port++}`])
  console.log(`Processo [${cp.pid}] iniciando...`)

  cp.stdout.on('data', msg => console.log(msg.toString().trim()))
  cp.on('exit', (code) => {
    console.log(`Processo [${cp.pid}] terminando com código [${code}]`)

    upInstance()
  })
}

for (let i = 0; i < INSTANCES; i++) {
  upInstance()
}