const { getUserWithUsername } = require('../_queries');

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'authService',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'auth-group' });
const producer = kafka.producer();

const consume = async topics => {
  let messageFromConsumer;
  debugger;
  await consumer.connect();
  await producer.connect();

  for (let i = 0; i < topics.length; i++) {
    await consumer.subscribe(topics[i]);
    debugger;
  }
  debugger;
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${
        message.timestamp
      }`;
      messageFromConsumer = message.value.toString('utf8');
      console.log(messageFromConsumer);
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const usernameFromDb = await getUserWithUsername(messageFromConsumer);

      const userObjToJSON = JSON.stringify(usernameFromDb);

      console.log(userObjToJSON);

      await producer.send({
        topic: 'author_reply',
        messages: [{ value: Buffer.from(userObjToJSON) }],
        acks: 1
      });

      producer.disconnect();
    }
  });
};

module.exports = topic => {
  return consume(topic);
};
