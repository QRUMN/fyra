const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const OBFUSCATION_OPTIONS = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayWrappersCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true
};

function obfuscateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const obfuscated = JavaScriptObfuscator.obfuscate(content, OBFUSCATION_OPTIONS);
    fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
    console.log(`Obfuscated ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.js')) {
            obfuscateFile(filePath);
        }
    });
}

// Start processing from build directory
processDirectory(path.join(__dirname, '../build'));
