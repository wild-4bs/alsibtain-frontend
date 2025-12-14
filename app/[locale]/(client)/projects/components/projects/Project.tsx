import LogoSm from "@/assets/logo-sm.svg";
import { Link } from "@/i18n/routing";

interface Props {
  title: string;
  caption: string;
}

export const Project = ({ title, caption }: Props) => {
  return (
    <Link href={"/projects/1"}>
      <article className="flex items-center flex-col relative z-10">
        <LogoSm className="mb-4" />
        <h4 className="font-medium text-base leading-6 mb-3">{title}</h4>
        <p className="text-base font-normal leading-6 text-subtitle-color w-full max-w-sm mx-auto text-center">
          {caption}
        </p>
      </article>
    </Link>
  );
};
