jest.mock('got');

import got from 'got';
import { post } from './post';

const gotPost = got.post as jest.Mock;

beforeEach(() => {
  gotPost.mockReset();
})

it('should post', () => {
  post({
    ddApi: 'dummy-url',
    ddApiKey: 'dummy-key',
    version: 'v1',
    service: 'service-name',
    text: '',
    tags: '',
  });

  expect(gotPost).toHaveBeenCalledWith('dummy-url', {
    json: {
      text: '',
      tags: [],
      title: `Deployment: service-name@v1`,
      source_type_name: 'deployment',
    },
    headers: {
      'dd-api-key': 'dummy-key',
    },
  })
});

it('should split and trim tags', () => {
  post({
    ddApi: 'dummy-url',
    ddApiKey: 'dummy-key',
    version: 'v1',
    service: 'service-name',
    text: '',
    tags: ' service:dummy,  foo:bar ',
  });

  expect(gotPost).toHaveBeenCalledWith('dummy-url', {
    json: {
      text: '',
      tags: [
        'service:dummy',
        'foo:bar',
      ],
      title: `Deployment: service-name@v1`,
      source_type_name: 'deployment',
    },
    headers: {
      'dd-api-key': 'dummy-key',
    },
  })
});

it('should show text when defined', () => {
  post({
    ddApi: 'dummy-url',
    ddApiKey: 'dummy-key',
    version: 'v1',
    service: 'service-name',
    text: 'Hello World',
    tags: '',
  });

  expect(gotPost).toHaveBeenCalledWith('dummy-url', {
    json: {
      text: '%%% \nHello World\n %%%',
      tags: [],
      title: `Deployment: service-name@v1`,
      source_type_name: 'deployment',
    },
    headers: {
      'dd-api-key': 'dummy-key',
    },
  })
});
