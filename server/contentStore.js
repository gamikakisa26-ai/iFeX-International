import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = path.join(__dirname, 'data', 'content.json');

// Simple mutex so concurrent writes (e.g. rapid admin edits) don't clobber
// each other when reading-modifying-writing the JSON file.
let writeQueue = Promise.resolve();

export async function readContent() {
  const raw = await fs.readFile(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function writeContent(content) {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8')
  );
  return writeQueue;
}

export async function updateCompany(partialCompany) {
  const content = await readContent();
  content.company = { ...content.company, ...partialCompany };
  await writeContent(content);
  return content.company;
}

export async function listPortfolio() {
  const content = await readContent();
  return content.portfolio;
}

export async function createPortfolioItem(item) {
  const content = await readContent();
  const newItem = {
    id: `p${Date.now()}`,
    title: '',
    category: 'Websites',
    categories: [],
    summary: '',
    tags: [],
    featured: false,
    image: '',
    images: [],
    ...item,
  };
  content.portfolio.unshift(newItem);
  await writeContent(content);
  return newItem;
}

export async function updatePortfolioItem(id, partialItem) {
  const content = await readContent();
  const index = content.portfolio.findIndex((p) => p.id === id);
  if (index === -1) return null;
  content.portfolio[index] = { ...content.portfolio[index], ...partialItem, id };
  await writeContent(content);
  return content.portfolio[index];
}

export async function deletePortfolioItem(id) {
  const content = await readContent();
  const exists = content.portfolio.some((p) => p.id === id);
  if (!exists) return false;
  content.portfolio = content.portfolio.filter((p) => p.id !== id);
  await writeContent(content);
  return true;
}
