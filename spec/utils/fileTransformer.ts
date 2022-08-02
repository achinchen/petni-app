const path = require('path');

function process(_, sourcePath) {
  return {
    code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`
  };
}

module.exports = {
  process
};
