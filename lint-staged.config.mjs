const eslintCmd = `npm run ci:lint`;

const formatCmd = 'npm run ci:format';

const stylelintCmd = 'npm run ci:stylelint';

const config = {
  '*': [formatCmd],
  '*.{ts,tsx}': [eslintCmd],
  '*.css': [stylelintCmd],
};

export default config;
