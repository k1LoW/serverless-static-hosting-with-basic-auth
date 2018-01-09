# Serverless boilerplate for Static website hosting with Basic authentication [![Build Status](https://travis-ci.org/k1LoW/serverless-static-hosting-with-basic-auth.svg?branch=master)](https://travis-ci.org/k1LoW/serverless-static-hosting-with-basic-auth)

## Architecture

```
[CloudFront (with Lambda@Edge)] -Restrict Bucket Access-> [S3 Origin Bucket]
```

## Usage

### Config

Set Basic authentication config ( `handler.js` )

### Deploy

```
$ npm install
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run deploy
```

### Synchronize src/* -> Website

```
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run sync
```

### Remove

```
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run remove
```
