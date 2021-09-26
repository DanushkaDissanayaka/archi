## There's a cron job attached to this AWS serverless template (nodejs).

### Add serverless as global package
```Bash
npm i serverless -g
```

### Set aws credential
```Bash
serverless config credentials --provider aws --key yourKey --secret YourSecret
```

### Test locally

In a local context, see if the function works.

```Bash
serverless invoke local -f log-cron
```

Something like this should happen as an outcome. as long as everything is in order

```PowerShell
C:\Project\Aws Lambda\archi>serverless invoke local -f log-cron
hello-im-from-cron-job
```
### Deploy

```Bash
serverless deploy
```

### Tail cron job

Every 5 minutes, the cron job will run.

```Bash
serverless logs --function log-cron --tail
```

You should get something like this as a result.
```PowerShell
START RequestId: 9857e3f7-134a-4e67-8df3-dfd84d522f86 Version: $LATEST
2021-08-29 21:10:46.438 (+05:30)        9857e3f7-134a-4e67-8df3-dfd84d522f86    INFO    hello-im-from-cron-job
END RequestId: 9857e3f7-134a-4e67-8df3-dfd84d522f86
REPORT RequestId: 9857e3f7-134a-4e67-8df3-dfd84d522f86  Duration: 190.77 ms     Billed Duration: 191 ms Memory Size: 128 MB     Max Memory Used: 78 MB
```

Your ```Lambda function may be stopped``` by setting the ```enabled flag to false in log-cron function ``` and then running ```serverless deploy``` again.\
You may also use ```serverless remove``` if you wish to ```delete your entire stack```.

### Parameter store

to get ENV variables form parameter store first set the parameter with aws console.
```
aws --profile default --region us-east-1 ssm put-parameter --name serverless-parameter-store-secret-value --value mySuperSecretValueFromParameterStore --type String
```
set env variable reference in serverless.yml

```yml
custom:
  settings:
    VAR_IN_PARAMETER_STORE: ${ssm:serverless-parameter-store-secret-value}

provider:
  region: us-east-1
  environment: ${self:custom.settings}
```

### Parameter store with KMS

Create KMS key first and get the key id from KMS

```
aws kms create-key --description kms-for-lambda --region us-east-1
```
Add env value to parameter store with KMS key id
```
aws --profile default --region us-east-1 ssm put-parameter --name /serverless/parameter/kms-secret-value --value mySuperSecretValueWithKMS --type SecureString --key-id 3da7b7ee-a9b9-4023-baa6-0dec325s32dk
```

set env variable reference in serverless.yml

```yml
custom:
  settings:
    VAR_IN_PARAMETER_KMS_STORE: ${ssm:serverless-parameter-kms-secret-value}
```

To decrypt value add

```yml
custom:
  settings:
    VAR_IN_PARAMETER_KMS_STORE: ${ssm:serverless-parameter-kms-secret-value~true}
```


## Multiple stages

Base on the stage property we can set the environment veritable for multiple stages
```yml
#provider
Provider:
  stage: ${opt:stage, 'dev'}
  environment:
    DB_HOST: ${self:custom.db_host.${self:provider.stage}}
    DB_USER: ${self:custom.db_user.${self:provider.stage}}
    DB_PASSWORD: ${self:custom.db_password.${self:provider.stage}}
    DATABASE: ${self:custom.database.${self:provider.stage}}

# Custom Variables
custom:
  stages:
    - dev
    - staging
    - prod

  db_host:
    dev: dev_db.example.com
    prod: ${ssm:app/prod/db_host}
    staging: ${ssm:app/staging/db_host}

  db_user:
    dev: dev_user
    prod: ${ssm:app/prod/db_user}
    staging: ${ssm:app/staging/db_user}

  db_password:
    dev: dev_password
    prod: ${ssm:app/prod/db_password~true}
    staging: ${ssm:app/staging/db_password~true}

  database:
    dev: dev_database
    prod: ${ssm:app/prod/database}
    staging: ${ssm:app/staging/database}
```
deploy with specific stage parameter
```
sls deploy --stage prod
```