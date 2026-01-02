import LogoSm from "@/assets/logo-sm.svg";
import { Link } from "@/i18n/routing";

interface Props {
  title: string;
  caption: string;
  id: string;
}

export const Project = ({ title, caption, id }: Props) => {
  return (
    <Link href={`/projects/${id}`} className="projects-page-project">
      <article className="flex items-center flex-col relative z-10 hover:opacity-100 opacity-70 duration-200">
        <LogoSm className="mb-4" />
        <h4 className="font-medium text-base leading-6 mb-3">{title}</h4>
        <p className="text-base font-normal leading-6 text-subtitle-color w-full max-w-sm mx-auto text-center">
          {caption}
        </p>
      </article>
    </Link>
  );
};
