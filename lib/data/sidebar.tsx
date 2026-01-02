import {
  Home,
  FolderKanban,
  Users2,
  ToolCase,
  InfoIcon,
  BoxIcon,
  WorkflowIcon,
  PhoneCall,
  UserRoundCog,
  ImageIcon,
  VideoIcon,
  Tag,
  Tags,
  BriefcaseBusiness,
  FileIcon,
  FileSpreadsheet,
  MailIcon,
  MessageSquareQuote,
  Newspaper,
  RefreshCcw,
} from "lucide-react";

const linkIconWidth = 18;
export const groups = [
  {
    name: "Pages",
    links: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <Home width={linkIconWidth} />,
      },
      {
        name: "About",
        path: "/dashboard/pages/about",
        icon: <InfoIcon width={linkIconWidth} />,
      },
      {
        name: "Projects",
        path: "/dashboard/pages/projects",
        icon: <BoxIcon width={linkIconWidth} />,
      },
      {
        name: "Services",
        path: "/dashboard/pages/services",
        icon: <ToolCase width={linkIconWidth} />,
      },
      {
        name: "Partners",
        path: "/dashboard/pages/partners",
        icon: <Users2 width={linkIconWidth} />,
      },
      {
        name: "News and Media",
        path: "/dashboard/pages/news-and-media",
        icon: <FolderKanban width={linkIconWidth} />,
      },
      {
        name: "Careers",
        path: "/dashboard/pages/careers",
        icon: <WorkflowIcon width={linkIconWidth} />,
      },
      {
        name: "Contact",
        path: "/dashboard/pages/contact-us",
        icon: <PhoneCall width={linkIconWidth} />,
      },
    ],
  },
  {
    name: "Collections",
    links: [
      {
        name: "Partners",
        path: "/dashboard/partners",
        icon: <Users2 width={linkIconWidth} />,
      },
      {
        name: "Team",
        path: "/dashboard/team",
        icon: <UserRoundCog width={linkIconWidth} />,
      },
      {
        name: "Gallery",
        path: "/dashboard/gallery",
        icon: <ImageIcon width={linkIconWidth} />,
      },
      {
        name: "Video Gallery",
        path: "/dashboard/video-gallery",
        icon: <VideoIcon width={linkIconWidth} />,
      },
      {
        name: "Careers Categories",
        path: "/dashboard/categories",
        icon: <Tags width={linkIconWidth} />,
      },
      {
        name: "Jobs",
        path: "/dashboard/jobs",
        icon: <BriefcaseBusiness width={linkIconWidth} />,
      },
      {
        name: "Applications",
        path: "/dashboard/applications",
        icon: <FileSpreadsheet width={linkIconWidth} />,
      },
      {
        name: "Projects",
        path: "/dashboard/projects",
        icon: <BoxIcon width={linkIconWidth} />,
      },
      {
        name: "Messages",
        path: "/dashboard/messages",
        icon: <MailIcon width={linkIconWidth} />,
      },
      {
        name: "Sliders Projects",
        path: "/dashboard/sliders-project",
        icon: <BoxIcon width={linkIconWidth} />,
      },
      {
        name: "Testimonials",
        path: "/dashboard/testimonials",
        icon: <MessageSquareQuote width={linkIconWidth} />,
      },
      {
        name: "Latest News",
        path: "/dashboard/latest-news",
        icon: <Newspaper width={linkIconWidth} />,
      },
      {
        name: "Projects Updates",
        path: "/dashboard/projects-updates",
        icon: <RefreshCcw width={linkIconWidth} />,
      },
    ],
  },
];
