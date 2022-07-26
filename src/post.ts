import got from 'got';

export const post = ({ ddApi, ddApiKey, service, version, text, tags }: {
  ddApi: string,
  ddApiKey: string,
  service: string,
  version: string,
  text: string,
  tags: string,
}) => got.post(ddApi, {
  json: {
    title: `Deployment: ${service}@${version}`,
    text: text ? `%%% \n${text}\n %%%` : '',
    tags: tags.split(',').filter((t) => t).map((t) => t.trim()),
    source_type_name: 'deployment'
  },
  headers: {
    'dd-api-key': ddApiKey
  }
});
