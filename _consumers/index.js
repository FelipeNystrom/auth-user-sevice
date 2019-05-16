const { getUserWithUsername } = require('../_queries');

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'authService',
  brokers: ['kafka:9092']
});

const matchTopic = topic => {
  switch (topic) {
    case 'author':
      return 'author_reply';
    case 'user_auth':
      return 'user_auth_reply';
    default:
      return null;
  }
};

const consumer = kafka.consumer({ groupId: 'auth-group' });
const producer = kafka.producer();

const consume = async topics => {
  let messageFromConsumer;

  await consumer.connect();
  await producer.connect();

  for (let i = 0; i < topics.length; i++) {
    await consumer.subscribe(topics[i]);
  }

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

      responseTopic = matchTopic(topic);

      if (responseTopic) {
        await producer.send({
          topic: responseTopic,
          messages: [{ value: Buffer.from(userObjToJSON) }],
          acks: 1
        });
      }

      producer.disconnect();
    }
  });
};

module.exports = topic => {
  return consume(topic);
};
