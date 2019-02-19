# Introduction
This repository contains the source code of the http://pp.io.

# Installation
Node and npm/yarn required
```
git clone git@github.com:PPIO/pp.io.git
cd pp.io
npm install
```

# Run
```
npm run build:dll
npm run start
```
Then you can preview the site at http://localhost:8080/, hot module replacement supported.

# Run with public url
```
npm run start:tunnel
```
Tunnel provided by [ngrok.com](https://ngrok.com/)

# Build static resources
```
npm run build
```

# Production page preview
```
npm run start:production
```
See it at http://localhost:9000

# Code linting
```
npm run lint
```
