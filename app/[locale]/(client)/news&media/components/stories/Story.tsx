import Image from "next/image";

interface Props {
  title: string;
  image: string;
  createdBy: string;
  date: string;
}

export const Story = ({ title, image, createdBy, date }: Props) => {
  return (
    <article className="flex flex-col">
      <Image
        src={image}
        alt={createdBy}
        width={1000}
        height={1000}
        className="w-full h-[151px] rounded-xl object-cover"
      />
      <div className="mt-2">
        <h3 className="font-black text-lg mb-2">{title}</h3>
        <div className="flex flex-row gap-2 font-medium text-sm">
          <span>{createdBy}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};
