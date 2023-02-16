import React from 'react';
export type TagFactory = {
    [modifier: string]: TagFactory;
    (children: React.ReactNode): JSX.Element;
    (s: TemplateStringsArray, ...argv: any[]): JSX.Element;
};
export type TagInfo = {
    tagName: string;
    attrs: Record<string, string>;
};
export declare const AttrProxyHandler: ProxyHandler<TagInfo>;
export declare const TagProxyHandler: ProxyHandler<Record<string, TagFactory>>;
export declare const T: Record<string, TagFactory>;
export declare const S: TagFactory;
export declare const C: TagFactory;
export declare const tags: {
    T: Record<string, TagFactory>;
    S: TagFactory;
    C: TagFactory;
};
