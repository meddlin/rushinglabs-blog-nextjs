# Deployment

Notes about how this site is deployed to Heroku.

Ref: [https://www.newline.co/@bespoyasov/deploying-nextjs-application-on-vercel-heroku-and-a-custom-static-server--0f163b04](https://www.newline.co/@bespoyasov/deploying-nextjs-application-on-vercel-heroku-and-a-custom-static-server--0f163b04)

In `package.json`, on `start` script, make sure the port is set.

Script

```js
"start": "next start -p $PORT"
```

Whole section

```js
"scripts": {
    "dev": "next dev",
    "debug": "cross-env NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start -p $PORT"
  },
```