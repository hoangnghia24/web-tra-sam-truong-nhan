import { createHash, randomUUID } from 'node:crypto';
import { readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const mediaDirectory = resolve(process.argv[2] ?? 'public/videos/phases');
const commit = process.env.VERCEL_GIT_COMMIT_SHA;
const ref = commit && /^[a-f0-9]{40}$/.test(commit) ? commit : 'main';
const files = (await readdir(mediaDirectory)).filter((name) => /^[a-z0-9-]+\.mp4$/.test(name));

for (const name of files) {
  const target = join(mediaDirectory, name);
  if ((await stat(target)).size > 512) continue;

  const pointer = await readFile(target, 'utf8');
  const match = /^version https:\/\/git-lfs\.github\.com\/spec\/v1\r?\noid sha256:([a-f0-9]{64})\r?\nsize (\d+)\r?\n?$/.exec(pointer);
  if (!match) throw new Error(`Invalid Git LFS pointer: ${name}`);

  const [, expectedHash, expectedSize] = match;
  const source = `https://media.githubusercontent.com/media/hoangnghia24/web-tra-sam-truong-nhan/${ref}/public/videos/phases/${name}`;
  const response = await fetch(source);
  if (!response.ok) throw new Error(`Could not download ${name}: HTTP ${response.status}`);

  const video = Buffer.from(await response.arrayBuffer());
  if (video.length !== Number(expectedSize) || createHash('sha256').update(video).digest('hex') !== expectedHash) {
    throw new Error(`Git LFS content does not match pointer: ${name}`);
  }

  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, video, { flag: 'wx' });
    await rename(temporary, target);
  } finally {
    await rm(temporary, { force: true });
  }
  console.log(`Resolved Git LFS video: ${name}`);
}
