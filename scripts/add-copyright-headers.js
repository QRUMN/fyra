const fs = require('fs');
const path = require('path');

const COPYRIGHT_HEADER = `/**
 * Copyright (c) 2025 QRUMN / FYRA
 * All rights reserved.
 * 
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CONFIDENTIAL
 * This file contains trade secrets and confidential information of FYRA.
 * Unauthorized access, reproduction, or distribution is strictly prohibited.
 */

`;

const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];

function addHeaderToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Copyright (c)')) {
    fs.writeFileSync(filePath, COPYRIGHT_HEADER + content);
    console.log(`Added copyright header to ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(filePath);
    } else if (stat.isFile() && FILE_EXTENSIONS.includes(path.extname(file))) {
      addHeaderToFile(filePath);
    }
  });
}

// Start processing from src directory
processDirectory(path.join(__dirname, '../src'));
