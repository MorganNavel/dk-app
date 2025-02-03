import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

interface EditableCellProps {
  initialText: string;
  onSave: (text: string) => void;
}
const EditableCell = ({ initialText, onSave }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleEditClick = async () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setText(initialText);
  };
  const handleSaveClick = () => {
    console.log("handleSaveClick");
    setIsEditing(false);
    onSave(text);
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  return (
    <td>
      <div className='flex items-center gap-2'>
        {isEditing ? (
          <>
            <Input
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={text}
            />

            <FaCheck
              onClick={() => handleSaveClick()}
              className='cursor-pointer text-success'
            />
          </>
        ) : (
          <>
            <span>{text}</span>
            <FaEdit
              onClick={handleEditClick}
              className="className='cursor-pointer text-orange-400"
            />
          </>
        )}
      </div>
    </td>
  );
};

export default EditableCell;
