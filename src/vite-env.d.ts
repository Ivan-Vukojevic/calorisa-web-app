/// <reference types="vite/client" />

// Image file type declarations
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

// Removed .webp and .avif declarations as we use JPG-only now

declare module '*.ico' {
  const value: string;
  export default value;
}

declare module '*.bmp' {
  const value: string;
  export default value;
}

// JSX namespace declaration for backward compatibility
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  interface ElementAttributesProperty {
    props: {};
  }
  interface ElementChildrenAttribute {
    children: {};
  }
  type IntrinsicElements = {
    [K in keyof React.JSX.IntrinsicElements]: React.JSX.IntrinsicElements[K];
  };
}
