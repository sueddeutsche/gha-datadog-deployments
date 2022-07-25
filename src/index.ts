import { getInput } from '@actions/core';
import { post } from './post';

const ddApi = getInput('dd-api');
const ddApiKey = getInput('dd-api-key');
const service = getInput('service');
const version = getInput('version');
const text = getInput('text');
const tags = getInput('tags');

post({ service, version, text, tags, ddApi, ddApiKey })
  .then(() => {
    console.log(`Successfully notified datadog for version: ${version}`);
  })
  .catch((err: Error) => {
    console.error(`Notify datadog failed: ${err.message}`);
    process.exit(1);
  });
