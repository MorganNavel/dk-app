import { renderStars } from "@/utils/renderStars";

interface CommentProps {
  fullname: string;
  comment: string;
  rating: number;
}

export const Comment = ({ fullname, comment, rating }: CommentProps) => {
  return (
    <div className="flex flex-col items-center p-4 m-2">
      <div className="flex flex-col items-center h-full">
        <p className="text-justify text-md lg:text-xl max-w-xs flex-grow">
          {comment}
        </p>
        <p className="text-justify mt-3 lg:mt-4">- {fullname} -</p>
        <div className="flex flex-col items-center mt-3 lg:mt-4">
          <div className="flex lg:mt-2">
            {renderStars(rating).map((star, index) => (
              <span key={index} className="text-yellow-500">
                {star}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
