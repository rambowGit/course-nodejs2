const { Low, JSONFile } = require('lowdb');
const path = require('path');

const dataFile = 'passwd.json';

const dbConnector = () => {
// Use JSON file for storage
const dbFile = path.join(process.cwd(), 'security', dataFile);
const adapter = new JSONFile(dbFile);
return new Low(adapter);
}

module.exports = dbConnector;



