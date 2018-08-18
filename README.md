# Boilerplate Serverless API
Basic node serverless REST API project with MySQL integration for when you need a quick base to build on.

# Prerequisites
- [Node](https://nodejs.org/en/) 8.10+
- [Serverless Framework](https://serverless.com/) 1.27.3+
```
npm install -g serverless
```

# Getting Started
1) Clone the boilerplate-serverless-api repository:
```
git clone https://github.com/jjdii/boilerplate-serverless-api.git
cd boilerplate-serverless-api
```

2) Create a new API in the AWS API Gateway.

3) Create a new user in AWS IAM with `AdministratorAccess`. Save the access keys provided.

4) Run the setup script. It will ask for your AWS access keys.
```
./sls setup
```

5) Create a new serverless.env.yml file:
```
# IAM > Roles
AWS_ROLE: arn:aws:iam::[AWS_IAM_ID]:role/[ROLE_NAME]

# API Gateway > YOUR_API_NAME > Resources
AWS_API_ID_PROD: [XXXXXXXXXX]
AWS_API_ROOT_ID_PROD: [XXXXXXXXXX]

# MySQL Credentials
DB_HOST: '[HOST_URL]'
DB_USER: '[USERNAME]'
DB_PASS: '[PASSWORD]'
DB_NAME: '[DATABASE]'
```
Example serverless.env.yml file:
```
AWS_ROLE: arn:aws:iam::103938583682:role/aws_lambda_executor

AWS_API_ID_PROD: k8d00ri42d
AWS_API_ROOT_ID_PROD: m26b5nsklk

AWS_API_ID_DEV: wa9dh38h9r
AWS_API_ROOT_ID_DEV: d73207gr7d

DB_HOST: 'test-cluster-1.cluster-jdiruvhtnnk.us-east-1.rds.amazonaws.com'
DB_USER: 'admin'
DB_PASS: '1234'
DB_NAME: 'test_db'
```
Separate `AWS_API_ID` & `AWS_API_ROOT_ID` entries must be made for every stage you wish to deploy to:
```
AWS_API_ID_DEV: wa9dh38h9r
AWS_API_ROOT_ID_DEV: d73207gr7d

AWS_API_ID_STAGING: 17tr923tr7
AWS_API_ROOT_ID_STAGING: dw20h3u38u

...
```

6) Run the deploy script:
```
./sls deploy all prod
```

7) Import `data/db.sql` into your MySQL database.

8) Import `data/pm.json` into Postman. Create a new environment and add `url` & `stage` variables. `url` is the endpoint supplied by the deploy script. `stage` was provided when running the deploy script and defaults to `dev` if omitted.

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