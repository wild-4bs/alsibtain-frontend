import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";

interface Props {
  image: string;
  date: string;
  createdBy: string;
  title: string;
  active: boolean;
}

export const Article = ({
  image,
  date,
  createdBy,
  title,
  active,
  ...props
}: Props & ComponentProps<"div">) => {
  return (
    <article
      {...props}
      className={clsx("flex gap-2 w-fit rounded-xl cursor-pointer", {
        "bg-primary/30": active,
      })}
    >
      {image && (
        <Image
          src={image}
          width={1000}
          height={1000}
          alt="article"
          className="w-[166px] h-auto object-cover rounded-xl"
        />
      )}
      <div className="flex flex-col justify-between gap-3 pe-4 py-2">
        <h3 className="font-black text-lg">{title}</h3>
        <div className="flex flex-row gap-2 font-medium text-xs whitespace-nowrap">
          <span>{createdBy}</span>
          <span className="capitalize">{date}</span>
        </div>
      </div>
    </article>
  );
};
