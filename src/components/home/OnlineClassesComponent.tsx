import { CustomButtonPrimary } from "@/components/reusable/Button/CustomRoundButton";
import onlineClassImg from "@public/assets/img/online-class.png";
import Image from "next/image";
interface OnlineClassesComponentProps {
  onClick: () => void;
}

export const OnlineClassesComponent = ({
  onClick,
}: OnlineClassesComponentProps) => {
  return (
    <div className="h-screen flex flex-col lg:flex-row items-center">
      <div className="hidden h-screen w-1/2 lg:flex justify-center items-center bg-primary">
        <div
          className="bg-white p-3 flex justify-center items-center rounded-lg  p-[4vw]"
          style={{ width: "30vw", height: "32vw" }}
        >
          <Image
            src={onlineClassImg}
            alt="Elearning icons"
            title="elearning icons"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start mx-[5vw] mt-[13vh]">
        <h1
          className="text-xl lg:text-2xl font-semibold font-Poppins max-w-md lg:max-w-lg text-center lg:text-left"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          Personalized Tutoring with Experienced Instructors
        </h1>
        <p className="lg:max-w-md max-w-md mt-6 lg:text-lg text-md text-justify lg:text-left">
          Discover the flexibility of our courses, whether you prefer
          personalized one-on-one sessions or engaging group classes.
        </p>
        <p className="lg:max-w-md max-w-md mt-4 lg:mt-6 lg:text-lg text-md text-justify">
          Learn Korean with confidence alongside our experienced instructors who
          tailor each lesson to your individual needs.
        </p>
        <CustomButtonPrimary
          text="Learn more"
          onClick={onClick}
          className="py-3 px-12 text-xl mb-6 mt-4 lg:mt-12"
        />
      </div>
      <div className="lg:hidden h-screen w-full flex justify-center items-center bg-primary">
        <div
          className="bg-white flex justify-center items-center rounded-lg p-3"
          style={{ width: "50vw", height: "52vw" }}
        >
          <Image
            src={onlineClassImg}
            alt="Elearning icons"
            title="elearning icons"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
