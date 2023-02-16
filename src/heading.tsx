import React from 'react';

const hx = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const anchoredHx = Object.fromEntries(hx.map(H => [
  H,
  ({children, id, ...props}: React.ComponentProps<(typeof hx)[number]>) => (
    <H {...{id, ...props}}>
      {id && <a className="anchor" href={'#'+encodeURIComponent(id)} />}
      {children}
    </H>
  ),
]));
