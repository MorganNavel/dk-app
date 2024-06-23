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
            <p className="text-xl text-center max-w-sm mx-auto mb-12">
              Get personalized resources based on your interests, and needs.
              Visit our questionnaire to start your customized learning journey!
            </p>
          </div>
          <button
            onClick={onClick}
            className="bg-primary text-xl transition-all duration-300 hover:bg-white hover:border hover:border-2 hover:border-primary hover:text-primary text-white py-3 px-10 rounded-full"
          >
            Start Questionnaire
          </button>
        </div>
      </div>
    </>
  );
};
