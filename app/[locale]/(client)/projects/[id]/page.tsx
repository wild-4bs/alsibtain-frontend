import { CallToAction } from "../../../../../components/CallToAction";
import { Player360 } from "./components/360Player";
import { Hero } from "./components/Hero";
import { IntroProject } from "./components/IntroProject";
import { ProjectsSlider } from "./components/ProjectsSlider";
import { VideosSlider } from "./components/VideosSlider";

export default function page() {
  return (
    <main>
      <Hero />
      <IntroProject />
      <Player360 />
      <ProjectsSlider />
      <VideosSlider />
      <CallToAction />
    </main>
  );
}
