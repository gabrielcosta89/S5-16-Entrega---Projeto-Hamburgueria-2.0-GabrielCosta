declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}
