//date formatting
const { format } = require('date-fns');

module.exports = (timestamp) => {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
};
