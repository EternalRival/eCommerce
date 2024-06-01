import { parseUrl } from './parse-url';

describe(parseUrl.name, () => {
  const protocol = 'http:';
  const hostname = 'example.com';
  const port = '8080';
  const pathname = '/endpoint/a/b/c';
  const search = '?key1=value1&key2=value2&key3=';
  const hash = '#somehash';

  describe('with endpoint', () => {
    it.each([
      {
        case: 'just endpoint',
        url: pathname,
        expected: {
          href: pathname,
          protocol: '',
          hostname: '',
          port: '',
          pathname,
          search: '',
          hash: '',
        },
      },
      {
        case: 'with search',
        url: `${pathname}${search}`,
        expected: {
          href: `${pathname}${search}`,
          protocol: '',
          hostname: '',
          port: '',
          pathname,
          search,
          hash: '',
        },
      },
      {
        case: 'with hash',
        url: `${pathname}${hash}`,
        expected: {
          href: `${pathname}${hash}`,
          protocol: '',
          hostname: '',
          port: '',
          pathname,
          search: '',
          hash,
        },
      },
      {
        case: 'with search and hash',
        url: `${pathname}${search}${hash}`,
        expected: {
          href: `${pathname}${search}${hash}`,
          protocol: '',
          hostname: '',
          port: '',
          pathname,
          search,
          hash,
        },
      },
    ])('return correct object on case $case', ({ url, expected }) => {
      expect(parseUrl(url)).toEqual(expected);
    });
  });
  describe('with url', () => {
    it.each([
      {
        case: 'just url',
        url: `${protocol}//${hostname}/`,
        expected: {
          href: `${protocol}//${hostname}/`,
          protocol,
          hostname,
          port: '',
          pathname: '/',
          search: '',
          hash: '',
        },
      },
      {
        case: 'with search',
        url: `${protocol}//${hostname}/${search}`,
        expected: {
          href: `${protocol}//${hostname}/${search}`,
          protocol,
          hostname,
          port: '',
          pathname: '/',
          search,
          hash: '',
        },
      },
      {
        case: 'with hash',
        url: `${protocol}//${hostname}/${hash}`,
        expected: {
          href: `${protocol}//${hostname}/${hash}`,
          protocol,
          hostname,
          port: '',
          pathname: '/',
          search: '',
          hash,
        },
      },
      {
        case: 'with search and hash',
        url: `${protocol}//${hostname}/${search}${hash}`,
        expected: {
          href: `${protocol}//${hostname}/${search}${hash}`,
          protocol,
          hostname,
          port: '',
          pathname: '/',
          search,
          hash,
        },
      },
      {
        case: 'with endpoint',
        url: `${protocol}//${hostname}${pathname}`,
        expected: {
          href: `${protocol}//${hostname}${pathname}`,
          protocol,
          hostname,
          port: '',
          pathname,
          search: '',
          hash: '',
        },
      },
      {
        case: 'with endpoint and search',
        url: `${protocol}//${hostname}${pathname}${search}`,
        expected: {
          href: `${protocol}//${hostname}${pathname}${search}`,
          protocol,
          hostname,
          port: '',
          pathname,
          search,
          hash: '',
        },
      },
      {
        case: 'with endpoint and hash',
        url: `${protocol}//${hostname}${pathname}${hash}`,
        expected: {
          href: `${protocol}//${hostname}${pathname}${hash}`,
          protocol,
          hostname,
          port: '',
          pathname,
          search: '',
          hash,
        },
      },
      {
        case: 'with endpoint, search and hash',
        url: `${protocol}//${hostname}${pathname}${search}${hash}`,
        expected: {
          href: `${protocol}//${hostname}${pathname}${search}${hash}`,
          protocol,
          hostname,
          port: '',
          pathname,
          search,
          hash,
        },
      },
    ])('return correct object on case $case', ({ url, expected }) => {
      expect(parseUrl(url)).toEqual(expected);
    });
  });
  describe('with url + port', () => {
    it.each([
      {
        case: 'just url',
        url: `${protocol}//${hostname}:${port}/`,
        expected: {
          href: `${protocol}//${hostname}:${port}/`,
          protocol,
          hostname,
          port,
          pathname: '/',
          search: '',
          hash: '',
        },
      },
      {
        case: 'with search',
        url: `${protocol}//${hostname}:${port}/${search}`,
        expected: {
          href: `${protocol}//${hostname}:${port}/${search}`,
          protocol,
          hostname,
          port,
          pathname: '/',
          search,
          hash: '',
        },
      },
      {
        case: 'with hash',
        url: `${protocol}//${hostname}:${port}/${hash}`,
        expected: {
          href: `${protocol}//${hostname}:${port}/${hash}`,
          protocol,
          hostname,
          port,
          pathname: '/',
          search: '',
          hash,
        },
      },
      {
        case: 'with search and hash',
        url: `${protocol}//${hostname}:${port}/${search}${hash}`,
        expected: {
          href: `${protocol}//${hostname}:${port}/${search}${hash}`,
          protocol,
          hostname,
          port,
          pathname: '/',
          search,
          hash,
        },
      },
      {
        case: 'with endpoint',
        url: `${protocol}//${hostname}:${port}${pathname}`,
        expected: {
          href: `${protocol}//${hostname}:${port}${pathname}`,
          protocol,
          hostname,
          port,
          pathname,
          search: '',
          hash: '',
        },
      },
      {
        case: 'with endpoint and search',
        url: `${protocol}//${hostname}:${port}${pathname}${search}`,
        expected: {
          href: `${protocol}//${hostname}:${port}${pathname}${search}`,
          protocol,
          hostname,
          port,
          pathname,
          search,
          hash: '',
        },
      },
      {
        case: 'with endpoint and hash',
        url: `${protocol}//${hostname}:${port}${pathname}${hash}`,
        expected: {
          href: `${protocol}//${hostname}:${port}${pathname}${hash}`,
          protocol,
          hostname,
          port,
          pathname,
          search: '',
          hash,
        },
      },
      {
        case: 'with endpoint, search and hash',
        url: `${protocol}//${hostname}:${port}${pathname}${search}${hash}`,
        expected: {
          href: `${protocol}//${hostname}:${port}${pathname}${search}${hash}`,
          protocol,
          hostname,
          port,
          pathname,
          search,
          hash,
        },
      },
    ])('return correct object on case $case', ({ url, expected }) => {
      expect(parseUrl(url)).toEqual(expected);
    });
  });
});
