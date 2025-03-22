
# AWS S3 Command Reference Guide

## Core S3 CLI Commands

### Bucket Operations
```bash
# Create a bucket
aws s3 mb s3://bucket-name

# Remove a bucket (must be empty)
aws s3 rb s3://bucket-name

# List all buckets
aws s3 ls

# List contents of a bucket
aws s3 ls s3://bucket-name
```

### File Operations
```bash
# Upload a file
aws s3 cp file.txt s3://bucket-name/

# Download a file
aws s3 cp s3://bucket-name/file.txt ./

# Sync a local directory to S3
aws s3 sync ./local-dir s3://bucket-name/target-dir

# Sync from S3 to local with delete option (mirror exactly)
aws s3 sync s3://bucket-name/source-dir ./local-dir --delete

# Move a file
aws s3 mv source.txt s3://bucket-name/destination.txt

# Delete a file
aws s3 rm s3://bucket-name/file.txt

# Delete all objects in a bucket
aws s3 rm s3://bucket-name --recursive
```

## Website Hosting Commands

```bash
# Enable static website hosting
aws s3 website s3://bucket-name --index-document index.html --error-document error.html

# Upload website files with public-read access
aws s3 sync ./website-files s3://bucket-name --acl public-read
```

## Access and Permissions 

```bash
# Apply bucket policy from a JSON file
aws s3api put-bucket-policy --bucket bucket-name --policy file://policy.json

# Make bucket public for static website (sample policy.json):
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Sid": "PublicReadGetObject",
#       "Effect": "Allow",
#       "Principal": "*",
#       "Action": "s3:GetObject",
#       "Resource": "arn:aws:s3:::bucket-name/*"
#     }
#   ]
# }

# Enable CORS on a bucket
aws s3api put-bucket-cors --bucket bucket-name --cors-configuration file://cors.json
```

## Advanced Operations

```bash
# Create pre-signed URL (temporary access link)
aws s3 presign s3://bucket-name/file.txt --expires-in 3600

# Set lifecycle policy
aws s3api put-bucket-lifecycle-configuration --bucket bucket-name --lifecycle-configuration file://lifecycle.json

# Enable versioning
aws s3api put-bucket-versioning --bucket bucket-name --versioning-configuration Status=Enabled

# Enable server-side encryption
aws s3api put-bucket-encryption --bucket bucket-name --server-side-encryption-configuration file://encryption.json
```

## Hosting a Static Website on S3

1. Create bucket with a unique name:
   ```bash
   aws s3 mb s3://jose-caudillo-portfolio
   ```

2. Enable static website hosting:
   ```bash
   aws s3 website s3://jose-caudillo-portfolio --index-document index.html --error-document index.html
   ```

3. Configure public access policy (save as `policy.json`):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::jose-caudillo-portfolio/*"
       }
     ]
   }
   ```

4. Apply the policy:
   ```bash
   aws s3api put-bucket-policy --bucket jose-caudillo-portfolio --policy file://policy.json
   ```

5. Upload website files:
   ```bash
   aws s3 sync ./dist/ s3://jose-caudillo-portfolio --acl public-read
   ```

6. Access your website at:
   ```
   http://jose-caudillo-portfolio.s3-website-[region].amazonaws.com
   ```

## Key Concepts (Azure to AWS Comparison)

| Azure                  | AWS S3                     | Description                                  |
|------------------------|----------------------------|----------------------------------------------|
| Storage Account        | S3 Bucket                  | Container for storing objects                |
| Container              | (No direct equivalent)     | S3 uses prefixes to simulate folders         |
| Blob                   | S3 Object                  | Individual file stored in the cloud          |
| Blob Storage           | S3 Standard                | General purpose storage                      |
| Cool Tier              | S3 Standard-IA             | Infrequent access storage                    |
| Archive Tier           | S3 Glacier                 | Long-term archival storage                   |
| Lifecycle Management   | S3 Lifecycle Configuration | Automate transition between storage tiers    |
| Shared Access Signature| Presigned URL              | Temporary access to resources                |
| Azure CDN              | CloudFront                 | Content delivery network                     |

## Useful Flags

```
--recursive   : Perform operation on all files/objects
--acl         : Set access permissions (e.g., private, public-read)
--storage-class : Specify storage class (STANDARD, STANDARD_IA, ONEZONE_IA, GLACIER)
--sse         : Enable server-side encryption 
--exclude     : Skip files matching pattern
--include     : Include files matching pattern
--dryrun      : Display operations without executing them
```

## Resources for Further Learning

- [Official AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)
- [AWS CLI Command Reference for S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html)
- [AWS S3 Bucket Hosting Tutorial](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)

## Common Troubleshooting

- **403 Forbidden**: Usually a permissions issue - check bucket policy and object ACLs
- **404 Not Found**: File doesn't exist or wrong path
- **BucketAlreadyExists**: Bucket names must be globally unique across all AWS accounts
- **SlowUploads**: Consider using `--only-show-errors` for large uploads

---

*This quick reference guide is designed for developers already familiar with cloud concepts and focuses on AWS S3 CLI commands for rapid implementation.*
