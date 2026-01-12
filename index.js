import promptSync from "prompt-sync";

const prompt = promptSync();

import dotenv from "dotenv";
dotenv.config();

const apiAccount = process.env.API_CLOUD_FARE_ACCOUNT;
const apiToken = process.env.API_CLOUD_FARE_TOKEN;
const apiModel = process.env.API_CLOUD_FARE_MODEL;


let info = "";

while (info !== "exit") {
  info = prompt("Enter anything: ");
  console.log(info);
}

console.log("out of the loop");
async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/ea9cf85e5b99f3dc68c798b757729d96/ai/run/${model}`,
    {
      headers: { Authorization: "Bearer POoyJ0W17gjGb8-VwjKbg0CmxXCo_KxFnAeUUqZy" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}