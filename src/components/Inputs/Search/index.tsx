import { useRef } from "react";

import { SearchProps } from "./interfaces";

export default function Search({onSubmit, ...props} : SearchProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = () => {
    onSubmit(inputRef.current?.value || "");

    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <form 
      ref={formRef}
      className="task-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }} 
    >
      <input {...props} type="text" ref={inputRef} />
      <button type="submit">Add task</button>
    </form>
  )
}