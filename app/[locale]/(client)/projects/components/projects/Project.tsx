import { Link } from "@/i18n/routing";
import Image from "next/image";

interface Props {
  title: string;
  caption: string;
  id: string;
  logo: string;
}

export const Project = ({ title, caption, id, logo }: Props) => {
  return (
    <Link href={`/projects/${id}`} className="projects-page-project">
      <article className="flex items-center flex-col relative z-10 hover:opacity-100 opacity-70 duration-200">
        {logo && <Image src={logo} width={1000} height={1000} className="mb-4 w-10" alt={title}/>
        }
        <h4 className="font-medium text-base leading-6 mb-3">{title}</h4>
        <p className="text-base font-normal leading-6 text-subtitle-color w-full max-w-sm mx-auto text-center">
          {caption}
        </p>
      </article>
    </Link>
  );
};
