import { CustomButtonPrimary } from "@/components/reusable/Button/CustomButtonPrimary";
import eLearningImg from "@public/assets/img/e-learning.png";

export const ELearningComponent = () => {
  return (
    <>
      <div className="h-screen flex flex-col lg:flex-row items-center lg:items-center">
        <img
          src={eLearningImg.src}
          alt="Elearning icons"
          title="elearning icons"
          className="lg:hidden mt-6 mr-2 h-[175px] w-[300px]"
        />
        <div className="flex flex-col items-center lg:items-start mx-[5vw] mt-[13vh] lg:mx-[15vw]">
          <h1
            className="text-xl lg:text-2xl font-semibold font-Poppins max-w-xs lg: max-w-lg  text-center lg:text-left"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            Your Korean Mastery: Expert Courses Await!
          </h1>
          <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left">
            Start your Korean fluency journey with our expert-led video lessons!
            Our curriculum supports all levels, from beginner to advanced.
          </p>
          <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify">
            Enjoy a variety of resources for daily conversations and exam prep,
            keeping your learning engaging and effective!
          </p>
          <CustomButtonPrimary
            text="Learn more"
            onClick={() => console.log("learn more")}
            className="py-3 px-12 text-xl mb-6 mt-12"
          />
        </div>
        <img
          src={eLearningImg.src}
          alt="Elearning icons"
          title="elearning icons"
          className="hidden lg:block h-[291px] w-[500px]"
        />
      </div>
    </>
  );
};
