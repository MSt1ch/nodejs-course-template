const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../common/config');

const hashGenerator = async (data) => {
  return await bcrypt.hash(data, +SALT_ROUNDS);
};

module.exports = hashGenerator;
