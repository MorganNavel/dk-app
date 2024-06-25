import { CustomButtonPrimary } from "@/components/reusable/Button/CustomButtonPrimary";
import rocket from "@public/assets/img/rocket.png";
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
            <p className="text-xl text-center max-w-md mx-auto pt-6 mb-12 relative">
              Unlock your potential and dive into the world of Korean language
              and culture. Join us today and take the first step towards
              mastering Korean!
            </p>
          </div>
          <CustomButtonPrimary
            onClick={onClick}
            text="Join Now"
            className="py-3 px-12 text-xl"
          />
        </div>
      </div>
      <img
        src={rocket.src}
        alt="rocket"
        className="hidden xl:block right-[17rem] top-[22rem] absolute transform -translate-y-1/2 h-[230px] w-[230px]"
      ></img>
    </>
  );
};
