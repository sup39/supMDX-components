import React from 'react';

export type TagFactory = {
  [modifier: string]: TagFactory
  (children: React.ReactNode): JSX.Element
  (s: TemplateStringsArray, ...argv: any[]): JSX.Element
};

export type TagInfo = {
  tagName: string
  attrs: Record<string, string>
};
export const AttrProxyHandler: ProxyHandler<TagInfo> = {
  get({tagName, attrs}, modifier) {
    let extra: TagInfo['attrs'];
    if (typeof modifier === 'symbol') {
      extra = {};
    } else if (modifier.startsWith('#')) {
      // #id
      extra = {id: modifier.slice(1)};
    } else if (modifier.includes('=')) {
      // attr=value
      const idx = modifier.indexOf('=');
      extra = {[modifier.slice(0, idx)]: modifier.slice(idx+1)};
    } else {
      // .class
      extra = {class: attrs.class ? attrs.class+' '+modifier : modifier};
    }
    // apply
    return new Proxy(
      Object.assign(()=>{}, {tagName, attrs: {...attrs, ...extra}}),
      AttrProxyHandler,
    );
  },
  apply({
    tagName,
    attrs: {class: className, for: htmlFor, style, ...attrs},
  }, thisArg, args) {
    const [s, ...argv] = args;
    const children = s instanceof Array ?
      s[0]+argv.map((e, i) => `${e}${s[i+1]}`).join('') : s;
    return React.createElement(
      tagName,
      {
        className,
        htmlFor,
        ...(style == null ? {} : {
          style: Object.fromEntries(style.split(';').flatMap(line => {
            const idx = line.indexOf(':');
            if (idx < 0) return [];
            const key0 = line.slice(0, idx);
            const value = line.slice(idx+1);
            // kebab-case to camelCase
            const ktoks = key0.split('-');
            const key = ktoks[0] + ktoks.slice(1).map(s => s[0].toUpperCase()+s.slice(1)).join('');
            return [[key, value]];
          })),
        }),
        ...attrs,
      },
      children,
    );
  },
};

export const TagProxyHandler: ProxyHandler<Record<string, TagFactory>> = {
  get(self, arg) {
    const tagName = arg.toString();
    return new Proxy(
      Object.assign(()=>{}, {tagName, attrs: {}}),
      AttrProxyHandler,
    );
  },
};

export const T = new Proxy({}, TagProxyHandler);
export const S = T.span;
export const C = T.code;
export const tags = {T, S, C};
