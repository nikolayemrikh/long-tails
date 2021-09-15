# long tails

## Development

Develop with dev-server outside of docker container

You need to have installed docker and docker-compose and nodejs >= 14 with yarn

Once you have just:

```bash
docker-compose -f docker-compose.dev.yml up
yarn install
yarn run hasura:init
yarn dev
```

Metadata and migrations will apply automatically in the start of graphql-engine container

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser
## Production docker build

Run following command and navigate to 3000 [http://localhost:3000](http://localhost:3000)

```bash
docker-compose -f docker-compose.prod.yml up
```

This will build image with nextjs server for production from app sources, create container and run it along with other needed containers\
Metadata and migrations will apply automatically in the start of graphql-engine container

## Deploy

To trigger deploy in Github Actions CI release new version. This should trigger docker-compose insede of AWS runner