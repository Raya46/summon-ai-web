import Image from "next/image";
interface CardProps {
  image: string;
  title1: string;
  content1: string;
  content2: string;
}
export default function CardProject({
  image,
  title1,
  content1,
  content2,
}: CardProps) {
  return (
    <div className="flex flex-col rounded-[20px] border border-[#2E2E2E] py-2 px-4 text-white ">
      <div className="flex items-center justify-center bg-gradient-to-r from-white via-[#999999] to-[#000DFF] rounded-[20px] p-4">
        <div className="relative w-[250px] h-[210px] self-center">
          <Image
            src={image}
            alt={image}
            fill
            className="object-cover self-center"
          />
        </div>
      </div>
      <div className="flex flex-col my-4">
        <p className="font-poppins text-[20px] font-bold">{title1}</p>
        <p className="font-poppins text-[16px] font-thin">{content1}</p>
        <p className="font-poppins text-[20px] font-bold mt-6">Content:</p>
        <p className="font-poppins text-[16px]">{content2}</p>
      </div>
    </div>
  );
}
