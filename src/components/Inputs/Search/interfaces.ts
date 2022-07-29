import { InputHTMLAttributes } from "react";

export type Input = InputHTMLAttributes<HTMLInputElement>;

export interface SearchProps extends Omit<Input, 'onSubmit' | 'type'> {
  onSubmit: (value: string) => void
}
