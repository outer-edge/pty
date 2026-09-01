// Generate photoreal crystal facet textures for TYPE AS IMAGE hero
// Creates seamless glass facet patterns with prismatic refraction

const fs = require('fs');
const { createCanvas } = require('canvas');

// Generate crystal-fill.png - seamless facet glass texture
function generateCrystalFill() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Clear/white base (glass is mostly clear)
  ctx.fillStyle = 'rgba(245, 248, 250, 1)';
  ctx.fillRect(0, 0, size, size);
  
  // Create voronoi-like facets
  const numFacets = 40;
  const points = [];
  for (let i = 0; i < numFacets; i++) {
    points.push({
      x: Math.random() * size,
      y: Math.random() * size,
      hue: Math.random() * 360,
      brightness: 0.7 + Math.random() * 0.3
    });
  }
  
  // Render each pixel based on nearest facet
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let minDist = Infinity;
      let nearestPoint = points[0];
      
      // Find nearest voronoi point
      for (const point of points) {
        const dx = x - point.x;
        const dy = y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearestPoint = point;
        }
      }
      
      // Calculate if we're near an edge (facet boundary)
      let secondMinDist = Infinity;
      for (const point of points) {
        if (point === nearestPoint) continue;
        const dx = x - point.x;
        const dy = y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < secondMinDist) {
          secondMinDist = dist;
        }
      }
      
      const edgeDist = secondMinDist - minDist;
      const isEdge = edgeDist < 8;
      
      const idx = (y * size + x) * 4;
      
      if (isEdge) {
        // Bright prismatic edge (caustic)
        const hue = nearestPoint.hue;
        const rgb = hslToRgb(hue / 360, 0.9, 0.85);
        data[idx] = rgb[0];
        data[idx + 1] = rgb[1];
        data[idx + 2] = rgb[2];
        data[idx + 3] = 255;
      } else {
        // Clear facet interior with subtle tint
        const hue = nearestPoint.hue;
        const rgb = hslToRgb(hue / 360, 0.3, 0.95);
        data[idx] = rgb[0];
        data[idx + 1] = rgb[1];
        data[idx + 2] = rgb[2];
        data[idx + 3] = 255;
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Add subtle noise/texture
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const brightness = Math.random() * 255;
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
    ctx.fillRect(x, y, 2, 2);
  }
  
  return canvas.toBuffer('image/png');
}

// Generate crystal-macro.png - detailed caustic reference
function generateCrystalMacro() {
  const size = 2048;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Clear base
  ctx.fillStyle = 'rgba(250, 252, 254, 1)';
  ctx.fillRect(0, 0, size, size);
  
  // Create larger, more detailed facets
  const numFacets = 25;
  const points = [];
  for (let i = 0; i < numFacets; i++) {
    points.push({
      x: Math.random() * size,
      y: Math.random() * size,
      hue: Math.random() * 360,
      intensity: 0.6 + Math.random() * 0.4
    });
  }
  
  // Render high-detail caustics
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let minDist = Infinity;
      let nearestPoint = points[0];
      
      for (const point of points) {
        const dx = x - point.x;
        const dy = y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearestPoint = point;
        }
      }
      
      // Calculate caustic intensity based on distance
      const caustic = Math.max(0, 1 - (minDist / 150));
      const hue = nearestPoint.hue;
      const intensity = nearestPoint.intensity * caustic;
      
      const idx = (y * size + x) * 4;
      const rgb = hslToRgb(hue / 360, 0.8, 0.5 + intensity * 0.5);
      
      data[idx] = Math.min(255, 240 + rgb[0] * intensity);
      data[idx + 1] = Math.min(255, 240 + rgb[1] * intensity);
      data[idx + 2] = Math.min(255, 240 + rgb[2] * intensity);
      data[idx + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  return canvas.toBuffer('image/png');
}

// HSL to RGB conversion
function hslToRgb(h, s, l) {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Generate and save
console.log('Generating crystal-fill.png...');
const fillBuffer = generateCrystalFill();
fs.writeFileSync('public/textures/crystal-fill.png', fillBuffer);
console.log('✓ crystal-fill.png saved');

console.log('Generating crystal-macro.png...');
const macroBuffer = generateCrystalMacro();
fs.writeFileSync('public/textures/crystal-macro.png', macroBuffer);
console.log('✓ crystal-macro.png saved');

console.log('Done!');
