
1. Deploying via [Render.com](https://render.com)


Deploying node packages doesn't omit dev dependencies by deffault. 
* Must run: `npm install --omit=dev`
* Even better: `npm ci --omit=dev`. Clean isntall from package-lock .json

> Note: Some devDependencies needed for building prod are
> 1.  Webpack, tsc, Vite, esbuild

## DNS Record Tips
1. Ensure that you've designate the canonical domain so web crawlers are aware
> With a link tag like so: `<link rel="canonical" href="https://dream-catcher.com">`

# SQLite
Why use? Single-user desktop, mobile apps, low-write concurency, IOT devices
## Limitations of SQLite
1. Database locking on write
2. Doesn't work w/ server clusters

> Solution -  PostGres - for concurrent writes, independent of application server

# Workflow
1. Push code to new branch
2. Deploy to staging
3. Test and make changes
4. Merge to `main`
5. Deploy to production

## Merging
Error deploying code to `main`: 
```
==> Running 'npm start'
> dream-catcher@1.0.0 start
> node server.js
Failed to initialize database: AggregateError [ECONNREFUSED]: 
    at /opt/render/project/src/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async initDatabase (file:///opt/render/project/src/config/database-init.js:5:18) {
  code: 'ECONNREFUSED',
  [errors]: [
    Error: connect ECONNREFUSED ::1:5432
        at createConnectionError (node:net:1686:14)
        at afterConnectMultiple (node:net:1716:16) {
      errno: -111,
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '::1',
      port: 5432
    },
    Error: connect ECONNREFUSED 127.0.0.1:5432
        at createConnectionError (node:net:1686:14)
        at afterConnectMultiple (node:net:1716:16) {
      errno: -111,
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '127.0.0.1',
      port: 5432
    }
  ]
}
==> Application exited early
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
```
* Issue was due to Render deploying the DB on emphermeral filesystem - (similar to EC2 non-dedicated instances *wink-wink*)

## Notifications and Webhooks

### Webhooks
1. Render has 50 evnets to attach to 
   * Deploys, data stores, scaling
* Flow: Deploy --> Deploy fail --> Trigger web hook --> Webhook sends JSON --> Server handles JSON --> Alerts engineers/kicks off other flow
* Can use alerting platforms like: PagerDuty/OpsGenie 

## Health Endpoint
* Grabs availability of services 

