# 🧠 Explain It Like I’m 5  
*A simple Next.js + OpenAI SDK demo project*

## Overview
**Explain It Like I’m 5** is a lightweight web app that takes any complex text and explains it in plain, simple language.  
It demonstrates **SDK integration**, **API routing**, and **secure environment management** in **Next.js**.

---

## 🚀 Features
- ⚙️ **Next.js (App Router)** – modern React framework for server + client components  
- 🔑 **OpenAI SDK** – securely called from a server route  
- 🔒 **Environment Variables** for API key management  
- ✅ **Input Validation** using [Zod](https://zod.dev/)  
- 🔁 **Basic Retry & Error Handling** for SDK calls  
- 🎨 **Simple UI** with loading and error states  

---

## 🧰 Tech Stack
- **Next.js 15+**
- **OpenAI SDK**
- **Zod**
- **React Hooks**
- **Tailwind CSS**

---

## 🏗️ Project Structure

```bash
/app
/api/ask/route.ts → API route using OpenAI SDK
/page.tsx → Frontend UI
/lib
openai.ts → Server-only SDK initialization
schema.ts → Zod schema for validation
.env.local → Environment variables
```

---

## ⚙️ Setup Instructions

### 1. Clone and install
```bash
git clone https://github.com/meljudd/explain-like-im-five.git
cd explain-like-im-five
npm install
```
