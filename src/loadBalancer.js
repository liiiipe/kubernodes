import { eq } from 'drizzle-orm'
import { db } from "../database/db"
import { servers as serversTable } from "../database/schema"

async function enableServer(port) {
  const server = db.select().from(serversTable).where(eq(serversTable.port, port)).get()
  if (server) {
    await db.update(serversTable).set({ active: 1 }).where(eq(serversTable.id, server.id))
  }
  else {
    await db.insert(serversTable).values({ port, active: 1 })
  }
}

async function disableServer(port) {
  const server = db.select().from(serversTable).where(eq(serversTable.port, port)).get()
  await db.update(serversTable).set({ active: 0 }).where(eq(serversTable.id, server.id))
}

function selectServer() {
  return db.select().from(serversTable).where(eq(serversTable.active, 1)).get()
}

export {
  enableServer,
  disableServer,
  selectServer
}