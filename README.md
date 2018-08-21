# Boilerplate Serverless API
Basic node serverless REST API project with MySQL integration for when you need a quick base to build on.

# Prerequisites
- [Node](https://nodejs.org/en/) 8.10+
- [Serverless Framework](https://serverless.com/) 1.27.3+
```
npm install -g serverless
```
- [Amazon Web Services CLI](https://aws.amazon.com/cli/) 1.15.4+
```
brew install awscli
```

# Getting Started
1) Clone the boilerplate-serverless-api repository:
```
git clone https://github.com/jjdii/boilerplate-serverless-api.git
cd boilerplate-serverless-api
```

2) Create a new API in the AWS API Gateway.

3) Create a new user in AWS IAM with `AdministratorAccess`. Save the access keys provided.

4) *If connecting to other AWS services*: Create a new security group for your Lambda functions. Attach this group as an inbound rule on the security groups of any other services you'd like to connect to (RDS, S3, EC2, etc).

5) Run the setup script to establish your environment. It will ask for your access keys from step 3.
```
./sls setup
```

6) Open the constants.yml file and make changes where necessary:
```
NAME: bsa
NODE_VERSION: nodejs8.10
AWS_MEMORY: 1536
AWS_TIMEOUT: 10
AWS_WARMUP_RATE: rate(4 minutes)
```

7) Create a new serverless.env.yml file:
```
# IAM > Roles
AWS_ROLE: arn:aws:iam::[AWS_IAM_ID]:role/[ROLE_NAME]

# VPC > Security Groups
# Only use VPC if connecting to other AWS services (RDS, S3, EC2, etc)
VPC_SECURITY: sg-[XXXXXXXX]
VPC_SUBNET1: subnet-[XXXXXXXX]
VPC_SUBNET2: subnet-[XXXXXXXX]
VPC_SUBNET3: subnet-[XXXXXXXX]
VPC_SUBNET4: subnet-[XXXXXXXX]

# API Gateway > YOUR_API_NAME > Resources
AWS_API_ID_DEV: [XXXXXXXXXX]
AWS_API_ROOT_ID_DEV: [XXXXXXXXXX]

# MySQL Credentials
DB_HOST: '[HOST_URL]'
DB_USER: '[USERNAME]'
DB_PASS: '[PASSWORD]'
DB_NAME: '[DATABASE]'
```
Example serverless.env.yml file:
```
AWS_ROLE: arn:aws:iam::103938583682:role/aws_lambda_executor

VPC_SECURITY: sg-89d8383a
VPC_SUBNET1: subnet-ch8ce9wd
VPC_SUBNET2: subnet-adh039dh
VPC_SUBNET3: subnet-wdny3283
VPC_SUBNET4: subnet-d7g87f7f

AWS_API_ID_DEV: wa9dh38h9r
AWS_API_ROOT_ID_DEV: d73207gr7d

DB_HOST: 'test-cluster-1.cluster-jdiruvhtnnk.us-east-1.rds.amazonaws.com'
DB_USER: 'admin'
DB_PASS: '1234'
DB_NAME: 'test_db'
```
Separate `AWS_API_ID` & `AWS_API_ROOT_ID` entries must be made for every stage you wish to deploy to:
```
AWS_API_ID_PROD: wa9dh38h9r
AWS_API_ROOT_ID_PROD: d73207gr7d

AWS_API_ID_STAGING: 17tr923tr7
AWS_API_ROOT_ID_STAGING: dw20h3u38u

...
```

8) Run the deploy script:
```
./sls deploy all dev
```

9) Import `data/db.sql` into your MySQL database.

10) Import `data/pm.json` into Postman. Create a new set of environment variables and add `url` & `stage` variables. 
- `url` is the endpoint supplied by the deploy script. 
- `stage` was provided when running the deploy script and defaults to `dev` if omitted.

# Scripts Reference
```
./sls setup
```
```
./sls deploy all [STAGE(optional)]
./sls deploy [ENDPOINT_NAME] [STAGE(optional)]
```
```
./sls remove all [STAGE(optional)]
./sls remove [ENDPOINT_NAME] [STAGE(optional)]
```
```
./sls npm install all
./sls npm install [ENDPOINT_NAME]
```
```
./sls npm addto all [NPM_PACKAGE]
./sls npm addto [ENDPOINT_NAME] [NPM_PACKAGE]
```