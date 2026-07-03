import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto w-full max-w-[1000px] px-5">{children}</div>;
};
