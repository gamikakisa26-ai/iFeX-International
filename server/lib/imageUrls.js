import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getRequestBaseUrl(req) {
  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL.replace(/\/$/, '');
  }

  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const host = req.get('x-forwarded-host') || req.get('host');
  return `${protocol}://${host}`;
}

export function buildPublicImageUrl(req, imagePath) {
  if (!imagePath) return imagePath;

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  if (imagePath.startsWith('/uploads/')) {
    return `${getRequestBaseUrl(req)}${imagePath}`;
  }

  return imagePath;
}

export function resolveLocalUploadPath(filename) {
  return path.join(path.dirname(__dirname), 'uploads', filename);
}
