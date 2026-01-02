import { Content } from "./components/Content";

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <Content />;
}
