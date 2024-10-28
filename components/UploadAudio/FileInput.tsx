import { forwardRef } from "react";

type FileInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput({ onChange }, ref) {
    return (
      <input
        type="file"
        accept=".mp3,audio/mpeg"
        ref={ref}
        onChange={onChange}
        className="hidden"
      />
    );
  }
);

export default FileInput;
