import { Button } from "@/components/ui/button";
import {
  InputField,
  TextareaField,
} from "@/components/ui/dashboard/dynamic-sections";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import {
  ImageKitFileResponse,
  useDeleteFromImageKit,
  useUploadToImageKit,
} from "@/services/imageKit";
import { useUpdatePageContents } from "@/services/pages";
import { HomePageContent } from "@/types/pages";
import { FormEvent } from "react";

export const ArContent = ({
  data,
}: {
  data: HomePageContent["sections"]["about"];
}) => {
  const { mutate, isPending } = useUpdatePageContents();
  const { isPending: isReplacing, mutateAsync: deleteImage } =
    useDeleteFromImageKit();
  const { mutateAsync, isPending: isUploading } = useUploadToImageKit();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const file = form.get("file");
    let imageData = null;
    if (file && (file as File).name != "") {
      data?.image?.value?.fileId &&
        data?.image?.value?.fileId != "" &&
        (await deleteImage({ fileId: data.image.value?.fileId }).catch(() => {
          return;
        }));
      await mutateAsync(form).then((res) => {
        imageData = res;
      });
    }

    const title = form.get("title");
    const caption = form.get("caption");

    mutate({
      pageName: "home",
      sectionName: "about",
      value: {
        title: {
          value: {
            en: data.title.value.en,
            ar: title,
          },
        },
        caption: {
          value: {
            en: data.caption.value.en,
            ar: caption,
          },
        },
        ...(imageData != null && imageData != ""
          ? {
              image: {
                value: {
                  url: (imageData as ImageKitFileResponse).url,
                  fileId: (imageData as ImageKitFileResponse).fileId,
                },
              },
            }
          : {}),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <InputField
              label="Title"
              name="title"
              defaultValue={data?.title?.value?.ar}
            />
            <TextareaField
              name="caption"
              label="Caption"
              defaultValue={data?.caption?.value?.ar}
            />
          </div>
          <ImageInput
            id="about-section-image"
            name="file"
            className="w-[250px] h-[300px]"
            defaultImage={data?.image?.value?.url}
          />
        </div>
        <Button
          type="submit"
          className="w-fit"
          disabled={isPending || isReplacing || isUploading}
        >
          {isReplacing
            ? "Replacing..."
            : isUploading
            ? "Uploading..."
            : isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
