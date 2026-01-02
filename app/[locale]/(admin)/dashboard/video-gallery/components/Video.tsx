import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/queryClientProvider";
import { useDeleteVideo } from "@/services/video-gallery";
import { TrashIcon } from "lucide-react";

export type GalleryVideoType = {
  _id: string;
  url: string;
  fileId: string;
};

export const GalleryVideo = ({ video }: { video: GalleryVideoType }) => {
  const { mutateAsync, isPending } = useDeleteVideo(video._id);

  const deleteVideo = async () => {
    try {
      await mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    } catch {}
  };

  return (
    <li className="group relative mb-4 overflow-hidden rounded-xl border bg-black">
      <video
        src={video.url}
        className="h-[280px] w-full object-cover"
        controls
        preload="metadata"
        playsInline
      />

      <div className="absolute right-2 top-2">
        <Button
          size="icon"
          variant="destructive"
          disabled={isPending}
          onClick={deleteVideo}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
};
