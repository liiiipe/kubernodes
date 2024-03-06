import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const servers = sqliteTable("servers", {
  id: integer("id").primaryKey(),
  port: text("port").notNull(),
  active: integer("id").notNull()
});