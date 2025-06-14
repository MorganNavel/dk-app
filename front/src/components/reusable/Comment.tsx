import { renderStars } from "@/utils/renderStars";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface CommentProps {
  fullname: string;
  comment: string;
  rating: number;
}

export const Comment = ({ fullname, comment, rating }: CommentProps) => {
  return (
    <Card className='relative max-w-96 lg:max-w-128 h-full cursor-pointer overflow-hidden rounded-xl border p-4'>
      <CardHeader className='text-center text-lg font-semibold'>
        - {fullname} -
      </CardHeader>
      <CardContent>
        <p className="relative px-5 italic before:content-['“'] before:absolute before:left-0 before:top-0 before:text-2xl before:text-gray-400 after:content-['”'] after:absolute after:right-0 after:bottom-0 after:text-2xl after:text-gray-400 ">
          {comment}
        </p>
      </CardContent>
      <CardFooter>
        <div className='flex justify-center gap-1 mt-3 lg:mt-4'>
          {renderStars(rating).map((star, index) => (
            <span key={index} className='text-yellow-500 text-lg'>
              {star}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
