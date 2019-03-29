const app = require('./server/app');
const config = require('./config');

app.listen(config.hostPort, () => console.log(`LaPS Server has been started on ${config.hostPort}`));
