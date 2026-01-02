import clsx from "clsx";
import Image from "next/image";
import { ComponentProps } from "react";

interface Props {
  title: string;
  image: string;
  createdBy: string;
  date: string;
  active: boolean;
}

export const Story = ({
  title,
  image,
  createdBy,
  date,
  active,
  ...props
}: Props & ComponentProps<"article">) => {
  return (
    <article
      className={clsx("flex flex-col rounded-xl cursor-pointer", {
        "bg-primary/30": active,
      })}
      {...props}
    >
      {image && (
        <Image
          src={image}
          alt={createdBy}
          width={1000}
          height={1000}
          className="w-full h-[151px] rounded-xl object-cover"
        />
      )}
      <div className="mt-2 pb-4 px-2">
        <h3 className="font-black text-lg mb-2">{title}</h3>
        <div className="flex flex-row gap-2 font-medium text-sm">
          <span>{createdBy}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};
