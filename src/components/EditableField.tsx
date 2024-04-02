import React, { useState, useRef, useEffect } from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  type?: string;
  name: string;
  isEditing: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  type = "text",
  name,
  isEditing,
  onInputChange,
  setIsEditing,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className="mt-2">
      <strong className="text-gray-600">{label}</strong>
      <br />
      {isEditing ? (
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onInputChange}
          className="text-gray-900 w-full rounded border p-1 my-1 max-w-96"
        />
      ) : (
        <p
          className="text-gray-600 cursor-pointer"
          onDoubleClick={() => {
            setIsEditing(true);
            ref.current?.focus();
            setTimeout(() => {
              ref.current?.setSelectionRange(0, ref.current.value.length);
            }, 0);
          }}
        >
          {value}
        </p>
      )}
    </div>
  );
};
