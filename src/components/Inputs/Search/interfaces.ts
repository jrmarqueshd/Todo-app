import { InputHTMLAttributes } from "react";

export type Input = InputHTMLAttributes<HTMLInputElement>;

export interface SearchProps extends Omit<Input, 'onSubmit'> {
  onSubmit: (value: string) => void
}
