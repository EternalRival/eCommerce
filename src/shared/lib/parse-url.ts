export type ParsedUrl = {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  href: string;
};

export function parseUrl(url: string): ParsedUrl {
  if (URL.canParse(url)) {
    const { protocol, hostname, port, pathname, search, hash, href } = new URL(url);

    return { protocol, hostname, port, pathname, search, hash, href };
  }

  const sourceUrl = new URL(url, `http://localhost`);

  return {
    protocol: '',
    hostname: '',
    port: '',
    pathname: sourceUrl.pathname,
    search: sourceUrl.search,
    hash: sourceUrl.hash,
    href: `${sourceUrl.pathname}${sourceUrl.search}${sourceUrl.hash}`,
  };
}
