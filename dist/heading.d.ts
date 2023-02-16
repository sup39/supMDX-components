import React from 'react';
declare const hx: readonly ["h1", "h2", "h3", "h4", "h5", "h6"];
export declare const anchoredHx: {
    [k: string]: ({ children, id, ...props }: React.ComponentProps<(typeof hx)[number]>) => JSX.Element;
};
export {};
