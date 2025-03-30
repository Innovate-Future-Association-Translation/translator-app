npm run build

# Sync to S3
aws s3 sync ./out s3://your-bucket-name --delete

# Clear CloudFront cache
aws cloudfront create-invalidation --distribution-id your-distribution-id --paths "/*"