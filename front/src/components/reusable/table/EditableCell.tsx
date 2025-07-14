import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

interface EditableCellProps {
  initialText: string;
  onSave: (text: string) => void;
}
const EditableCell = ({ initialText, onSave }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleEditClick = (e: any) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setText(initialText);
  };

  const handleSave = (e: any) => {
    e.stopPropagation();
    if (text.trim() !== "") {
      onSave(text);
    } else {
      setText(initialText);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave(e);
    if (e.key === "Escape") handleBlur();
  };

  return (
    <div className='flex items-center gap-2'>
      {isEditing ? (
        <>
          <Input
            onChange={(e) => {
              setText(e.target.value);
              e.stopPropagation();
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            value={text}
            autoFocus
          />

          <FaCheck
            onClick={handleSave}
            className='cursor-pointer text-success'
          />
        </>
      ) : (
        <Button
          variant='ghost'
          className='flex gap-2 items-center group'
          onClick={(e) => handleEditClick(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleEditClick(e);
          }}
          tabIndex={0}
        >
          {text}
          <FaEdit
            onClick={handleEditClick}
            className='opacity-0 cursor-pointer text-orange-400 hover:text-orange-500 group-hover:opacity-100 transition-opacity duration-200 '
          />
        </Button>
      )}
    </div>
  );
};

export default EditableCell;
