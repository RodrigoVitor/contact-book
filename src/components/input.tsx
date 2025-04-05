import { ChangeEvent } from "react";

type InputType = {
  type: string;
  placeholder: string;
  value: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  placeholder,
  value,
  onChangeInput,
}: InputType) {
  return (
    <input
      type={type}
      className="w-[300px] p-2 border rounded-md focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChangeInput}
    />
  );
}
