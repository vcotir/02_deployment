
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

