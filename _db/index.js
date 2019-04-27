// const options = {
//   error: (error, e) => {
//     if (e.cn) {
//       // A connection-related error;
//       console.log('CN:', e.cn);
//       console.log('EVENT:', error.message);
//     }
//   }
// };

// const pgp = require('pg-promise')(options);

const pgp = require('pg-promise')();

const db = pgp(process.env.DB_URL);
db.connect({ direct: true })
  .then(sco => {
    debugger;
    sco.client.on('notification', data => {
      console.log(data);
    });
    return sco.none('LISTEN $1~', 'users'), sco.none('LISTEN $1~', 'projects');
  })
  .catch(error => {
    debugger;
    console.error('Error:', error);
  });

module.exports = db;
