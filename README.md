# Petni App

An application provides cat & dog information in Taiwan for pet adoption.

User can use family, color, size and geolocation to set preference to get randomly recommended pets, and save it into favorite collection. User can add new animal for adoption after login. 

The app also provides some useful information about 24hr animal hospital in Taiwan and color information about dog and cat. 

## Resource 
The data is from open data api of Taiwanese government.
The design draft is provided by Taiwanese designer K.T.

## Setup 
Prepare env file
```
cp .env.example .env 
```

Install dependencies
```
yarn install
```

Start db server which provides created table and feed the seed.
Don't forget to up your docker
```
yarn dev:db
```

Then,
Start dev server
``` 
yarn dev
```

## Tech Stack
- [Remix](https://github.com/remix-run/remix)
- [React](https://github.com/facebook/react)
- [Unocss](https://github.com/unocss/unocss)
- [Prisma](https://github.com/prisma/prisma)
- [Jest](https://github.com/facebook/jest)



