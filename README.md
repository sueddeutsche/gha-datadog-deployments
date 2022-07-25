# Datadog deployment notification

Send version metric to datadog.

## Usage

```yaml
jobs:
  deploy:
    name: Unit tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - uses: sueddeutsche/gha-datadog-deployments@main
        with: 
          dd-api-key: ${{ secrets.DD_API_KEY }}
          service: some-service-name 
          version: vX.Y.Z
          text: 'Deployed version: ...'
          tags: 'foo:bar, dummy:bla'
```
