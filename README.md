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
AWS_API_ID: [XXXXXXXXXX]
AWS_API_ROOT_ID: [XXXXXXXXXX]

# MySQL Credentials
DB_HOST: '[HOST_URL]'
DB_USER: '[USERNAME]'
DB_PASS: '[PASSWORD]'
DB_NAME: '[DATABASE]'
```
- Example serverless.env.yml file:
```
AWS_ROLE: arn:aws:iam::103938583682:role/aws_lambda_executor

AWS_API_ID: k8d00ri42d
AWS_API_ROOT_ID: m26b5nsklk

DB_HOST: 'test-cluster-1.cluster-jdiruvhtnnk.us-east-1.rds.amazonaws.com'
DB_USER: 'admin'
DB_PASS: '1234'
DB_TABLE: 'test_db'
```

6) Run the deploy script:
```
./sls deploy all
```

7) Import `data/db.sql` into your MySQL database.

8) Import `data/pm.json` into Postman and update the endpoint URLs with those returned by the deploy script.

# Scripts Reference
```
./sls setup
```
```
./sls deploy all
./sls deploy [ENDPOINT_NAME]
```
```
./sls remove all
./sls remove [ENDPOINT_NAME]
```
```
./sls npm install all
./sls npm install [ENDPOINT_NAME]
```
```
./sls npm addto all [NPM_PACKAGE]
./sls npm addto [ENDPOINT_NAME] [NPM_PACKAGE]
```