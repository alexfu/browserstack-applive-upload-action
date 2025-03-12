const core = require('@actions/core');
const fs = require('fs');
const { default: axios } = require('axios');

async function getFileReadStream(file, uploadedName) {
  if (uploadedName) {
    await fs.promises.copyFile(file, uploadedName);
    return fs.createReadStream(uploadedName);
  }

  return fs.createReadStream(file);
}

async function run() {
  try {
    const username = core.getInput('username', { required: true });
    const accessKey = core.getInput('access-key', { required: true });
    const file = core.getInput('file', { required: true });
    const uploadedName = core.getInput('uploaded-filename');

    const data = {
      file: await getFileReadStream(file, uploadedName)
    };

    const opts = {
      auth: {
        username: username,
        password: accessKey
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    await axios.post('https://api-cloud.browserstack.com/app-live/upload', data, opts);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
