# Datadog deployment event notification

Send version event to datadog.

## Usage

```yaml
- uses: sueddeutsche/gha-datadog-deployments@v0
  with: 
    dd-api-key: ${{ secrets.DATADOG_API_KEY }}
    service: some-service-name
    version: vX.Y.Z
    text: 'Link: [Markdown link to Github](https://link.to.github/vX.Y.Z)'
    tags: 'foo:bar, dummy:bla'
```
