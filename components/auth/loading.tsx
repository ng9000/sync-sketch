import Image from "next/image";

export const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src="/logo.svg"
        alt="sync sketch logo"
        width={70}
        height={70}
        className="animate-pulse duration-700"
      />
    </div>
  );
};
