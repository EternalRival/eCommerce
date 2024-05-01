import { ESLint } from 'eslint';

async function eslintCmd(files) {
  const eslint = new ESLint();
  const isPathIgnoredList = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  return `npm run ci:lint ${files.filter((_, i) => !isPathIgnoredList[i]).join(' ')}`;
}

const formatCmd = 'npm run ci:format';

const stylelintCmd = 'npm run ci:stylelint';

const config = {
  '*': [formatCmd],
  '*.{ts,tsx}': [eslintCmd],
  '*.css': [stylelintCmd],
};

export default config;
