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