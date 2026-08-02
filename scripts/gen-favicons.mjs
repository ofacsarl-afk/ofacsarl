// Génère les favicons (ICO + PNG) à partir du logo OFAC.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/favicon-ofac.jpg";

async function pngSquare(size) {
  return await sharp(SRC)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png()
    .toBuffer();
}

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const parts = [header, dir];
  images.forEach((img, i) => {
    const b = 16 * i;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 0);
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 1);
    dir.writeUInt8(0, b + 2);
    dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4);
    dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(img.png.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += img.png.length;
    parts.push(img.png);
  });
  return Buffer.concat(parts);
}

// PNG favicons
writeFileSync("public/icon-192.png", await pngSquare(192));
writeFileSync("public/icon-512.png", await pngSquare(512));
writeFileSync("public/apple-icon.png", await pngSquare(180));

// favicon.ico (16, 32, 48)
const ico = buildIco([
  { size: 16, png: await pngSquare(16) },
  { size: 32, png: await pngSquare(32) },
  { size: 48, png: await pngSquare(48) },
]);
writeFileSync("public/favicon.ico", ico);

console.log("OK favicons générés: favicon.ico, icon-192.png, icon-512.png, apple-icon.png");
