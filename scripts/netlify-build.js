const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const color = type === 'success' ? colors.green 
              : type === 'warning' ? colors.yellow 
              : type === 'error' ? colors.red 
              : colors.cyan;
  
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

async function main() {
  try {
    // Start build process
    log('Starting Netlify build process...', 'info');

    // Check environment
    log('Checking environment...', 'info');
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'production';
    }

    // Install dependencies
    log('Installing dependencies...', 'info');
    execSync('npm ci --no-audit --no-fund', { stdio: 'inherit' });

    // Run type checking
    log('Running type checking...', 'info');
    execSync('tsc --noEmit', { stdio: 'inherit' });

    // Run linting
    log('Running linting...', 'info');
    execSync('npm run lint', { stdio: 'inherit' });

    // Run tests if they exist
    if (fs.existsSync('src/__tests__')) {
      log('Running tests...', 'info');
      execSync('npm test', { stdio: 'inherit' });
    }

    // Build the application
    log('Building application...', 'info');
    execSync('npm run build:protected', { stdio: 'inherit' });

    // Post-build optimizations
    log('Running post-build optimizations...', 'info');

    // Verify build
    if (!fs.existsSync('dist')) {
      throw new Error('Build directory does not exist');
    }

    // Add version file
    const packageJson = require('../package.json');
    fs.writeFileSync(
      path.join('dist', 'version.json'),
      JSON.stringify({
        version: packageJson.version,
        buildTime: new Date().toISOString(),
        environment: process.env.NODE_ENV
      })
    );

    // Success message
    log('Build completed successfully! 🚀', 'success');
    log(`
      Build Summary:
      - Environment: ${process.env.NODE_ENV}
      - Version: ${packageJson.version}
      - Build Time: ${new Date().toISOString()}
    `, 'success');

  } catch (error) {
    log('Build failed! ❌', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

main();
