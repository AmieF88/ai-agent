import promptSync from "prompt-sync";
import dotenv from "dotenv";

dotenv.config();
const prompt = promptSync();

const apiAccount = process.env.API_CLOUD_FARE_ACCOUNT;
const apiToken = process.env.API_CLOUD_FARE_TOKEN;
const apiModel = process.env.API_CLOUD_FARE_MODEL;

let info = "";

const messages = [
  {
    role: "system",
    content:
      "You are an AI agent that answers questions about the movie Step Brothers.",
  },
];

while (info !== "exit") {
  info = prompt("Ask me anything about the movie Step Brothers: ");
  if (info === "exit") break;

  messages.push({ role: "user", content: info });

  const result = await run(apiModel, messages);
  console.log(result);
}

console.log("out of the loop");

async function run(model, messagesArr) {
  const bodyObj = { messages: messagesArr };


  console.log("SENDING:", JSON.stringify(bodyObj, null, 2));

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    }
  );

  return await response.json();
}
