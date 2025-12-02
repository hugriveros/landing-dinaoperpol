import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.resolve(__dirname, '..', 'src', 'components', 'demos', 'CarouselVariants.tsx');
const text = fs.readFileSync(file, 'utf8');

const pairs = {
  '(': ')',
  '{': '}',
  '[': ']'
};
const open = Object.keys(pairs);
const close = Object.values(pairs);

const stack = [];
for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  if (open.includes(ch)) {
    stack.push({ ch, i });
  } else if (close.includes(ch)) {
    const last = stack[stack.length - 1];
    if (!last) {
      console.log(`Unmatched closing '${ch}' at index ${i}`);
      process.exit(1);
    }
    const expected = pairs[last.ch];
    if (ch === expected) {
      stack.pop();
    } else {
      console.log(`Mismatched at index ${i}: expected '${expected}' but found '${ch}'`);
      process.exit(1);
    }
  }
}
if (stack.length === 0) {
  console.log('All balanced');
  process.exit(0);
} else {
  const last = stack[stack.length - 1];
  console.log(`Unclosed '${last.ch}' at index ${last.i}`);
  process.exit(1);
}
