declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content:  React.FunctionComponentDetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  export default content;
}
