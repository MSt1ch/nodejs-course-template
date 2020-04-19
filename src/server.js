const { PORT } = require('./common/config');
const { connectToDB } = require('./db/db.client');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
