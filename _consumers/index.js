const kafka = require('kafka-node');

const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.KafkaClient;
const Consumer = kafka.Consumer;
const { checkIfUserExists: getUser } = require('../_queries');

const client = new Client();
const producer = new HighLevelProducer(client, { requireAcks: 1 });

const topics = [{ topic: 'author', partition: 0 }];

const consumer = new Consumer(client, topics);

consumer.on('message', (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
  debugger;
});
