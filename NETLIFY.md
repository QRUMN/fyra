# Netlify Deployment Guide

## Prerequisites

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

## Deployment Steps

1. Initialize Netlify (first time only):
```bash
netlify init
```

2. Deploy to production:
```bash
npm run netlify:deploy
```

3. Deploy draft (for testing):
```bash
npm run netlify:deploy:draft
```

## Environment Variables

Set these in Netlify dashboard:

- `NODE_ENV`: "production"
- `VITE_API_URL`: Your API URL
- Add other environment variables as needed

## Build Settings (Netlify Dashboard)

- Build command: `npm run netlify:build`
- Publish directory: `dist`
- Node version: 18

## Security Headers

Already configured in `netlify.toml`:
- CSP headers
- HSTS
- XSS protection
- Frame options
- Content type options

## Cache Control

Configured for:
- Static assets
- JavaScript files
- CSS files
- Fonts

## Monitoring

1. Enable Netlify Analytics
2. Set up status alerts
3. Configure error tracking

## Troubleshooting

If build fails:
1. Check build logs
2. Verify environment variables
3. Test locally: `netlify build`
4. Check dependencies

## Support

For authorized team members only:
[Contact Information]
