export const DoubleCircles = () => {
  return (
    <div className="relative hidden lg:flex w-full">
      <div className="absolute bottom-0 left-0 w-[20vw] h-[20vw] rounded-tr-full bg-primary opacity-65 border-t-[1px] border-r-[1px]"></div>
      <div className="absolute bottom-0 right-0  w-[20vw] h-[20vw] rounded-tl-full bg-primary opacity-65 border-t-[1px] border-r-[1px]"></div>
    </div>
  );
};
