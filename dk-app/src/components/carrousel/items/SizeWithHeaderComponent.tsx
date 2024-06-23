import React, { ReactNode, useEffect, useState } from "react";

export const SizeWithHeaderComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [slideHeight, setSlideHeight] = useState<number>(755);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight - 144;
      setSlideHeight(newHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative"
      style={{ height: `${slideHeight}px` }}
    >
      {children}
    </div>
  );
};
