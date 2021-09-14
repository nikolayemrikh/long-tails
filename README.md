# long tails

## Development

You need to have installed docker and docker-compose and nodejs >= 14

Once you have just:

```bash
docker-compose up
npm install
npm run hasura:init
npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Production docker build

Run following command and navigate to 3000 [http://localhost:3000](http://localhost:3000)

```bash
docker-compose -f docker-compose.prod.yml up
```

This will build image for production from app sources, create container and run it along with other needed containers