import { IoRocketOutline } from "react-icons/io5";
interface NewHereProps {
  onClick: () => void;
}

export const StartKoreanJourneyComponent = ({ onClick }: NewHereProps) => {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center text-primary space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold drop-shadow-md mb-12">
              Start Your Korean Journey!
            </h2>
            <p className="text-xl text-center max-w-sm mx-auto pt-6 mb-12 relative">
              Unlock your potential and dive into the world of Korean language
              and culture. Join us today and take the first step towards
              mastering Korean!
            </p>
          </div>

          <button
            onClick={onClick}
            className="bg-primary text-xl transition-all duration-300 hover:bg-white hover:border hover:border-2 hover:border-primary hover:text-primary text-white py-3 px-12 rounded-full"
          >
            Join Now
          </button>
        </div>
      </div>
      <IoRocketOutline className="hidden xl:block right-1/4 mt-12 absolute top-1/3 transform -translate-y-1/2 text-9xl h-[450px] text-gray-400" />
    </>
  );
};
