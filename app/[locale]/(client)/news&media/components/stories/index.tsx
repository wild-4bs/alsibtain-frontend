import Container from "@/components/Container";
import { Story } from "./Story";
import { Button } from "@/components/ui/button";

const storiesData = [
  {
    id: 1,
    image: "/stories/1.jpg",
    title: "Life-Changing Moments: Personal Narratives that Inspire",
    author: "JANE MAY",
    date: "TODAY",
  },
  {
    id: 2,
    image: "/stories/2.jpg",
    title: "Overcoming Adversity: Inspiring Tales of Resilience",
    author: "TAYLOR STONE",
    date: "TODAY",
  },
  {
    id: 3,
    image: "/stories/3.jpg",
    title: "Cultural Chronicles: Traditions and Tales from Around the World",
    author: "LILLY LANE",
    date: "TODAY",
  },
  {
    id: 4,
    image: "/stories/4.jpg",
    title: "Unheard Voices: Stories from Remote Communities",
    author: "JANE MAY",
    date: "TODAY",
  },
  {
    id: 5,
    image: "/stories/5.jpg",
    title: "Unexpected Heroes: Ordinary People Doing Extraordinary Things",
    author: "TAYLOR STONE",
    date: "TODAY",
  },
  {
    id: 6,
    image: "/stories/6.jpg",
    title: "Urban Legends: Exploring the Myths and Mysteries of Cities",
    author: "JANE MAY",
    date: "YESTERDAY",
  },
  {
    id: 7,
    image: "/stories/7.jpg",
    title: "Innovative Minds: Stories of Creativity and Invention",
    author: "TAYLOR STONE",
    date: "YESTERDAY",
  },
  {
    id: 8,
    image: "/stories/8.jpg",
    title: "The Human Connection: Heartwarming Stories that Unite Us",
    author: "JANE MAY",
    date: "YESTERDAY",
  },
];

export const Stories = () => {
  return (
    <section className="mt-28">
      <Container>
        <h2 className="font-black text-3xl mb-6">Stories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {storiesData.map((story) => (
            <Story
              key={story.id}
              image={story.image}
              title={story.title}
              createdBy={story.author}
              date={story.date}
            />
          ))}
        </div>
        <Button className="mt-6 text-lg font-black" variant={"ghost"}>
          See more +
        </Button>
      </Container>
    </section>
  );
};
