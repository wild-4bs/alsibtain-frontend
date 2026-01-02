"use client";

import { useGetVideos } from "@/services/video-gallery";
import { CreateButton } from "./components/CreateButton";
import { GalleryVideo } from "./components/Video";

export const Content = () => {
  const { data } = useGetVideos();

  return (
    <section>
      <div className="header flex justify-between items-center">
        <div className="title">
          <h1 className="text-3xl font-bold">Video Gallery</h1>
          <p>
            This gallery of videos will be visible at the single project page
            only.
          </p>
        </div>
        <div className="options">
          <CreateButton />
        </div>
      </div>
      <ul className="mt-8 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {data?.map((video) => {
          return <GalleryVideo video={video} key={video._id} />;
        })}
      </ul>
    </section>
  );
};
