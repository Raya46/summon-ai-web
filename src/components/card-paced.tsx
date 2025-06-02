import Image from "next/image";
interface CardPacedProps {
  title: string;
  content: string;
  image: string;
  secondImage?: string;
  fill?: boolean;
}
export default function CardPaced({
  title,
  content,
  image,
  secondImage,
  fill = false,
}: CardPacedProps) {
  return (
    <div
      className={`flex flex-col border border-[#2E2E2E] rounded-xl text-white py-4 px-8 ${
        fill
          ? "bg-gradient-to-br from-transparent from-40% via-[#2C00FF] to-[#0C0144]"
          : "bg-transparent"
      }`}
    >
      <p className="font-inter text-[23px] font-bold mt-4">{title}</p>
      <p className="font-inter text-[16px] font-thin mt-4">{content}</p>
      {secondImage ? (
        <div className="flex flex-row items-center justify-center gap-4 pb-5">
          <div className="relative w-1/2 aspect-[4/3]">
            <Image
              src={image}
              alt={image}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="relative w-1/2 aspect-[4/3]">
            <Image
              src={secondImage}
              alt={secondImage}
              fill
              className="object-contain rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-xs mx-auto aspect-[4/3] sm:h-60">
          <Image
            src={image}
            alt={image}
            fill
            className="object-contain sm:object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}
