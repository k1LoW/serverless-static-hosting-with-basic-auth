# Serverless boilerplate for Static website hosting with Basic authentication [![Build Status](https://travis-ci.org/k1LoW/serverless-static-hosting-with-basic-auth.svg?branch=master)](https://travis-ci.org/k1LoW/serverless-static-hosting-with-basic-auth)

## Architecture

```
[CloudFront (with Lambda@Edge)] -Restrict Bucket Access-> [S3 Origin Bucket] <-Sync- [Local src/*]
```

### Using plugin

- [serverless-plugin-cloudfront-lambda-edge](https://github.com/silvermine/serverless-plugin-cloudfront-lambda-edge)
- [serverless-s3-sync](https://github.com/k1LoW/serverless-s3-sync)

## Usage

### Install boilerplate

```
$ git clone https://github.com/k1LoW/serverless-static-hosting-with-basic-auth.git ./my-static-page
```

### Set Basic authentication USERNAME:PASS

Set Basic authentication config ( `handler.js` )

### Deploy stack

```
$ npm install
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run deploy
```

### Synchronize src/* -> Website

```
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run sync
```

### Remove stack

```
$ AWS_PROFILE=XxxxxXXX WEBSITE_S3_BUCKET_NAME=sls-static-basic npm run remove
```
