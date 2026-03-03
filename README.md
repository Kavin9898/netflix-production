# 🎬 StreamFlix Platform

Microservices-based streaming platform built with:

- Node.js
- React
- Kafka
- Spark
- MongoDB
- Docker
- Jenkins
- Terraform

---

## 🚀 Run Locally

Make sure Docker is installed.

### 1️⃣ Clone the repo

git clone https://github.com/your-username/streamflix.git
cd streamflix

### 2️⃣ Start all services

docker-compose up --build

### 3️⃣ Access Services

Frontend:
http://localhost:3000

Auth API:
http://localhost:5000

Movie API:
http://localhost:6000

Recommendation API:
http://localhost:7000

---

## 🏗 Architecture

Frontend → Auth/Movie Services → Kafka → Spark → Data Lake

---

## 🐳 Stop Services

docker-compose down
