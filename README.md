# long tails

[http://18.162.224.40:3000/best-world-ever](http://18.162.224.40:3000/best-world-ever)
## Development

Develop with dev-server outside of docker container

You need to have installed docker and docker-compose and nodejs >= 14 with yarn

Once you have just:

```bash
docker-compose -f docker-compose.dev.yml up
yarn install
yarn dev
```

Metadata and migrations will apply automatically in the start of graphql-engine container

Then navigate to [http://localhost:3000/best-hello-world-ever](http://localhost:3000/best-hello-world-ever) in your browser

Edit data in tails.json, reload page or go to another page via link and see changes

## Production docker build

Run following command and navigate to 3000 [http://localhost:3000/best-hello-world-ever](http://localhost:3000/best-hello-world-ever)

```bash
docker-compose -f docker-compose.prod.yml up
```

This will build image with nextjs server for production from app sources, create container and run it along with other needed containers\
Metadata and migrations will apply automatically in the start of graphql-engine container

## Deploy

To trigger deploy in Github Actions CI release new version. This should trigger docker-compose insede of AWS runner
