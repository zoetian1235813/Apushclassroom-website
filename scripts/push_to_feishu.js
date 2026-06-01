import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse command line arguments
const getArgValue = (argName) => {
  const index = process.argv.findIndex((arg) => arg === argName);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
};

// Determine files and settings
const defaultFile = "C:\\Users\\Zoe Tian\\.gemini\\antigravity\\brain\\622ad908-318d-45c3-89d1-6636e203c8b4\\transition_marketing_campaign.md";
const targetFilePath = getArgValue("--file") || defaultFile;
const webhookUrl = getArgValue("--url") || process.env.FEISHU_WEBHOOK_URL;

const run = async () => {
  console.log("----------------------------------------");
  console.log("Feishu Markdown Message Pusher starting...");
  console.log(`Target File: ${targetFilePath}`);

  if (!webhookUrl) {
    console.error("Error: Feishu Webhook URL is missing.");
    console.error("Please provide it via --url argument or set FEISHU_WEBHOOK_URL in .env");
    console.log("----------------------------------------");
    process.exit(1);
  }

  if (!fs.existsSync(targetFilePath)) {
    console.error(`Error: File does not exist at ${targetFilePath}`);
    console.log("----------------------------------------");
    process.exit(1);
  }

  try {
    const rawContent = fs.readFileSync(targetFilePath, "utf8");
    const fileBaseName = path.basename(targetFilePath);

    console.log(`Reading successful. File size: ${rawContent.length} bytes.`);
    
    // Parse Markdown lines to convert to Feishu Rich Text Post format
    const lines = rawContent.split(/\r?\n/);
    const postContent = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        postContent.push([...currentParagraph]);
        currentParagraph = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        continue;
      }

      // Header H1
      if (trimmed.startsWith("# ")) {
        flushParagraph();
        postContent.push([
          {
            tag: "text",
            text: trimmed.replace("# ", "") + "\n",
            style: ["bold"]
          }
        ]);
        continue;
      }

      // Header H2
      if (trimmed.startsWith("## ")) {
        flushParagraph();
        postContent.push([
          {
            tag: "text",
            text: "■ " + trimmed.replace("## ", "") + "\n",
            style: ["bold"]
          }
        ]);
        continue;
      }

      // Header H3
      if (trimmed.startsWith("### ")) {
        flushParagraph();
        postContent.push([
          {
            tag: "text",
            text: "○ " + trimmed.replace("### ", "") + "\n",
            style: ["bold"]
          }
        ]);
        continue;
      }

      // Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph();
        postContent.push([
          {
            tag: "text",
            text: "• " + trimmed.substring(2)
          }
        ]);
        continue;
      }

      // Ordered Lists
      const orderMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
      if (orderMatch) {
        flushParagraph();
        postContent.push([
          {
            tag: "text",
            text: `${orderMatch[1]}. ${orderMatch[2]}`
          }
        ]);
        continue;
      }

      // Regular line
      currentParagraph.push({
        tag: "text",
        text: trimmed + "\n"
      });
    }
    flushParagraph();

    console.log(`Parsed into ${postContent.length} structural sections.`);

    // Feishu Webhook Post payload schema
    const payload = {
      msg_type: "post",
      content: {
        post: {
          zh_cn: {
            title: `APUSH 推广企划: ${fileBaseName.replace(".md", "")}`,
            content: postContent
          }
        }
      }
    };

    console.log("Sending payload to Feishu Webhook...");
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Body: ${responseText}`);

    if (response.status === 200) {
      console.log("Success: Content pushed to Feishu chat.");
    } else {
      console.error(`Failure: Server responded with status ${response.status}`);
    }
    console.log("----------------------------------------");
  } catch (error) {
    console.error("An error occurred during execution:", error.message);
    console.log("----------------------------------------");
    process.exit(1);
  }
};

run();
