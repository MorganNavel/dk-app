import { renderStars } from "@/utils/renderStars";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface CommentProps {
  fullname: string;
  comment: string;
  rating: number;
}

export const Comment = ({ fullname, comment, rating }: CommentProps) => {
  return (
    <Card className="p-6 shadow-lg rounded-2xl bg-background ">
      <CardHeader className="text-center text-lg font-semibold">
        - {fullname} -
      </CardHeader>
      <CardContent>
        <p className="text-justify text-md lg:text-xl min-h-[350px]">
          {comment}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center gap-1 mt-3 lg:mt-4">
          {renderStars(rating).map((star, index) => (
            <span key={index} className="text-yellow-500 text-lg">
              {star}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
