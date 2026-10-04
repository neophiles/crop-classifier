import type { HTMLElementType, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

interface ContainerProps extends Props {
  type?: HTMLElementType;
}

interface TextProps extends Props {
  type?: HTMLElementType;
  size?: "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "bold";
}

export type {
  Props,
  ContainerProps,
  TextProps
}
