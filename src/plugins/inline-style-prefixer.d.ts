declare module 'inline-style-prefixer/static' {
  type Plugin = (style: { [key: string]: any }) => ({ [key: string]: any });
  const plugin: Plugin;
  export = plugin;
}
