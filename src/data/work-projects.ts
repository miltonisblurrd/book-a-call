export type PropAnchor =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "top"
  | "bottom";

export type HoverProp = {
  src: string;
  size: number;
  anchor: PropAnchor;
  rotate: number;
  delayIn: number;
  delayOut: number;
  /** Optional nudge from the anchored edge position */
  xOffset?: string;
  yOffset?: string;
};

export type WorkProject = {
  id: string;
  name: string;
  thumbnail: string;
  thumbnailClass?: string;
  /** Plays on card hover; pauses and resets when hover ends */
  hoverVideo?: string;
  categories: string[];
  hoverProps: HoverProp[];
  overlayImages: Array<{ src: string; className?: string }>;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "symphny",
    name: "Symphny",
    thumbnail: "/images/symphnyHomeShot.png",
    hoverVideo: "/images/symrecord.mp4",
    thumbnailClass: "work-thumbnail-symphny-hero",
    categories: ["Branding", "Product", "Website"],
    hoverProps: [
      {
        src: "/images/symphny-sticker-gear.png",
        size: 96,
        anchor: "top-left",
        rotate: -14,
        delayIn: 0,
        delayOut: 120,
        yOffset: "12px",
      },
      {
        src: "/images/symphny-sticker-chat.png",
        size: 88,
        anchor: "top-right",
        rotate: 12,
        delayIn: 55,
        delayOut: 85,
        yOffset: "20px",
      },
      {
        src: "/images/symphny-sticker-network.png",
        size: 100,
        anchor: "bottom-left",
        rotate: -10,
        delayIn: 110,
        delayOut: 45,
        yOffset: "-10px",
      },
      {
        src: "/images/symphny-sticker-conductor.png",
        size: 96,
        anchor: "bottom-right",
        rotate: 18,
        delayIn: 165,
        delayOut: 0,
        yOffset: "-8px",
      },
    ],
    overlayImages: [
      {
        src: "/images/case-studies/symphny/07-wordmark-and-identity.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/01-brand-in-one-page.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/06-color-and-type-system.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/03-orchestra-model.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/09-responsive-system.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/10-ai-assisted-discovery.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/12-architecture-overview.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/13-client-operations-portal.jpg",
        className: "image-one-window",
      },
      {
        src: "/images/case-studies/symphny/14-mcp-and-content-systems.jpg",
        className: "image-one-window",
      },
    ],
  },
  {
    id: "safefaces",
    name: "Safe Faces",
    thumbnail: "/images/safeFacesImage.png",
    hoverVideo: "/images/safeFaces.mp4",
    thumbnailClass: "work-thumbnail-safefaces-hero",
    categories: ["Branding", "Product", "iOS"],
    hoverProps: [
      {
        src: "/images/01-app-mark.svg",
        size: 84,
        anchor: "top-left",
        rotate: -12,
        delayIn: 0,
        delayOut: 110,
        xOffset: "8px",
        yOffset: "24px",
      },
      {
        src: "/images/05-post-safe.svg",
        size: 78,
        anchor: "top-right",
        rotate: 16,
        delayIn: 50,
        delayOut: 75,
        xOffset: "-10px",
        yOffset: "16px",
      },
      {
        src: "/images/04-on-device.svg",
        size: 96,
        anchor: "left",
        rotate: 8,
        delayIn: 100,
        delayOut: 40,
        yOffset: "30px",
      },
      {
        src: "/images/03-face-exposed.svg",
        size: 74,
        anchor: "right",
        rotate: -18,
        delayIn: 130,
        delayOut: 20,
        yOffset: "-20px",
      },
      {
        src: "/images/02-face-covered.svg",
        size: 68,
        anchor: "bottom-left",
        rotate: 6,
        delayIn: 80,
        delayOut: 60,
        xOffset: "20px",
        yOffset: "-12px",
      },
    ],
    overlayImages: [
      { src: "/images/Group-47654-1.jpg", className: "image-one-window" },
    ],
  },
  {
    id: "shipnetwork",
    name: "ShipNetwork",
    thumbnail: "/images/snhero.png",
    hoverVideo: "/images/snVideo.mp4",
    thumbnailClass: "work-thumbnail-shipnetwork-hero",
    categories: ["Branding", "Product", "Website"],
    hoverProps: [
      {
        src: "/images/sn1.svg",
        size: 104,
        anchor: "top-left",
        rotate: -10,
        delayIn: 0,
        delayOut: 100,
        yOffset: "18px",
      },
      {
        src: "/images/sn2.svg",
        size: 96,
        anchor: "top-right",
        rotate: 14,
        delayIn: 60,
        delayOut: 70,
        yOffset: "22px",
      },
      {
        src: "/images/sn3.svg",
        size: 112,
        anchor: "bottom-right",
        rotate: -8,
        delayIn: 120,
        delayOut: 35,
        xOffset: "-6px",
      },
      {
        src: "/images/sn4.svg",
        size: 86,
        anchor: "bottom-left",
        rotate: 22,
        delayIn: 170,
        delayOut: 0,
        xOffset: "14px",
        yOffset: "-6px",
      },
    ],
    overlayImages: [
      { src: "/images/Group-47629_1.avif", className: "image-one-window" },
      { src: "/images/Frame-47407_1.avif", className: "image-case" },
      { src: "/images/Group-47462_1.avif", className: "image-case" },
      { src: "/images/Frame-47411_1.avif", className: "image-case" },
    ],
  },
];
