import { spawn } from 'node:child_process'
import { enableServer, disableServer } from './loadBalancer'

const INSTANCES = 3
const INITIAL_PORT = 3000

const upInstance = async (port) => {
  const cp = spawn('node', ['server.js', `${port}`])
  console.log(`Processo [${cp.pid}] iniciando...`)

  await enableServer(port)

  cp.stdout.on('data', msg => console.log(msg.toString().trim()))
  cp.on('exit', async (code) => {
    await disableServer(port)

    console.log(`Processo [${cp.pid}] terminando com código [${code}]`)

    upInstance(port)
  })
}

for (let i = 0; i < INSTANCES; i++) {
  upInstance(INITIAL_PORT + i)
}