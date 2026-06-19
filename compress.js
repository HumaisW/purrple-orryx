const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'public');
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(fullPath)) {
      if (stat.size > MAX_SIZE) {
        console.log(`Compressing ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
        const tempPath = fullPath + '.tmp';
        
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          
          // If the image is extremely large in dimensions, scale it down
          if (metadata.width > 3840) {
            pipeline = pipeline.resize(3840, null, { withoutEnlargement: true });
          }
          
          if (/\.(jpg|jpeg)$/i.test(fullPath)) {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
          } else if (/\.png$/i.test(fullPath)) {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
          }
          
          await pipeline.toFile(tempPath);
          fs.renameSync(tempPath, fullPath);
          
          const newStat = fs.statSync(fullPath);
          console.log(`-> Done! New size: ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (err) {
          console.error(`Failed to compress ${fullPath}:`, err);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

processDirectory(targetDir).then(() => {
  console.log("Compression complete.");
}).catch(console.error);
