"use client";
import { useGetProjectById } from "@/services/projects";
import { CallToAction } from "../../../../../../components/CallToAction";
import { Player360 } from "../components/360Player";
import { Hero } from "../components/Hero";
import { IntroProject } from "../components/IntroProject";
import { ProjectsSlider } from "../components/ProjectsSlider";
import { VideosSlider } from "../components/VideosSlider";
import { useParams } from "next/navigation";

export const Content = () => {
  const { id } = useParams();
  const { data } = useGetProjectById(id as string);
  return (
    <main>
      <Hero project={data} />
      <IntroProject project={data} />
      {data?.showUrukCity360 && <Player360 />}
      <ProjectsSlider />
      <VideosSlider />
      <CallToAction />
    </main>
  );
};
