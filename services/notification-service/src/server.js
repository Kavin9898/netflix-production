require("dotenv").config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: "notification-group" });

const run = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topics: ["user.signup", "movie.uploaded", "watch.completed"],
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());

      console.log(`📩 Received event from ${topic}`);
      console.log(data);

      // Here you can send email / SMS / push notification
      if (topic === "user.signup") {
        console.log(`Send welcome email to ${data.email}`);
      }

      if (topic === "movie.uploaded") {
        console.log(`Notify users about new movie: ${data.title}`);
      }

      if (topic === "watch.completed") {
        console.log(`User ${data.userId} completed movie ${data.movieId}`);
      }
    }
  });
};

run().catch(console.error);