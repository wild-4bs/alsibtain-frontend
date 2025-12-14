import Image from "next/image";

interface Props {
  image: string;
  date: string;
  createdBy: string;
  title: string;
}

export const Article = ({ image, date, createdBy, title }: Props) => {
  return (
    <article className="flex gap-2">
      <Image
        src={image}
        width={1000}
        height={1000}
        alt="article"
        className="w-[166px] h-auto object-cover rounded-xl"
      />
      <div className="flex flex-col justify-between gap-3">
        <h3 className="font-black text-lg">{title}</h3>
        <div className="flex flex-row gap-2 font-medium text-sm">
          <span>{createdBy}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};
