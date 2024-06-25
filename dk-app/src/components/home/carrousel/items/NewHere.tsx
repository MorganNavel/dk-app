import { CustomButtonPrimary } from "@/components/reusable/Button/CustomButtonPrimary";
interface NewHereProps {
  onClick: () => void;
}

export const NewHereComponent = ({ onClick }: NewHereProps) => {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center text-primary space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold drop-shadow-md mb-12">
              New Here?
            </h2>
            <p className="text-xl text-center max-w-md mx-auto mb-12">
              Get personalized resources based on your interests, and needs.
              Visit our questionnaire to start your customized learning journey!
            </p>
          </div>
          <CustomButtonPrimary
            onClick={onClick}
            text="Start Questionnaire"
            className="py-3 px-10 text-xl"
          />
        </div>
      </div>
    </>
  );
};
