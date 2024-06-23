import { BsGraphUp } from "react-icons/bs";
interface ReadReviewsProps {
  onClick: () => void;
}

export const ReadReviewsComponent = ({ onClick }: ReadReviewsProps) => {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center text-primary space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold drop-shadow-md">
              Join Hundreds of Successful Learners
            </h2>
            <p className="text-xl text-center max-w-sm mx-auto pt-6 relative">
              We've helped hundreds of learners achieve their Korean language
              goals. You can be the next one!
            </p>
          </div>
          <BsGraphUp
            width={150}
            height={150}
            className="text-9xl text-gray-400 mb-12  "
          />

          <button
            onClick={onClick}
            className="bg-primary text-xl transition-all duration-300 hover:bg-white hover:border hover:border-2 hover:border-primary hover:text-primary text-white py-3 px-12 rounded-full"
          >
            Read Reviews
          </button>
        </div>
      </div>
    </>
  );
};
