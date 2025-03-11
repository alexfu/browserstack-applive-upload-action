const core = require('@actions/core');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function run() {
  try {
    const username = core.getInput('username', { required: true });
    const accessKey = core.getInput('access-key', { required: true });
    const file = core.getInput('file', { required: true });

    const data = new FormData();
    data.set('file', fs.createReadStream(file));

    await axios.post('https://api-cloud.browserstack.com/app-live/upload', data, { auth: { username: username, password: accessKey } });
  } catch (error) {
    core.setFailed(error);
  }
}

run();
