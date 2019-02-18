#!/bin/bash

# build
npm run build

# copy index.html to index_mob.html
cp dist/index.html dist/index_mob.html

# sync local files to S3:bucket
aws s3 sync ./dist s3://pp.io2 --acl public-read

# create cloudfront distribution invalidation
aws cloudfront create-invalidation --distribution-id E1VRFX5KBKXI4R --paths /index.html  /download.html /index_mob.html
