import "dotenv/config";
import { Client, Intents, Collection } from "discord.js";
import { google } from "googleapis";
import keys from "../keys.json";
import mongoose from "mongoose";
import fs from "fs";
import { loadList } from "./functions/load-list";

console.log(process.env.DATABASE_URL);

export const bot = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const prefix = ".";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("?");

client.authorize((err, tokens) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection Complete!");
  }
});

bot.on("ready", () => {
  console.log("Up and running");
  bot.user.setActivity("Mhmhmhm I am being updated.");
});

bot.on("message", (msg) => {
  let args = msg.content.substring(prefix.length).split(" ");
  if (msg.content.charAt(0) === prefix) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return;
    if (msg === "update") loadList(client);
  }
});

bot.login(process.env.DISCORD_TOKEN);
