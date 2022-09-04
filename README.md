# Art Exhibitions API

## Getting Started

This application has been developped with:
- Node.js v16.16.0
- npm v8.11.0

To setup and start this NestJS application, please do the following commands:

```bash
# First clone the repo
git@github.com:spcmnd/amn-art-exhibitions-api.git

# Then navigate to the folder
cd amn-art-exhibitions-api

# Install npm dependencies
npm install
```

You will need a `.env` file to load environment variables such as the following:

```
PORT=8080
NODE_ENV=development

EXHIBITION_API_URL='https://api.harvardartmuseums.org'
# Requested here: https://docs.google.com/forms/d/1Fe1H4nOhFkrLpaeBpLAnSrIMYvcAxnYWm0IU9a6IkFA/viewform
EXHIBITION_API_KEY=<YOUR_API_KEY>

GEOCODER_API_URL='https://geocoding.geo.census.gov'

WEATHER_API_URL='https://api.weather.gov'
```

Then simply:

```bash
npm start

# OR

npm run start:dev # To get hot reload
```