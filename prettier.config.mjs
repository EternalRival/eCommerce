/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  semi: true,
  quoteProps: 'consistent',
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'strict',
  printWidth: 120,
  singleQuote: true,
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
