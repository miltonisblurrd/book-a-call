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
  categories: string[];
  hoverProps: HoverProp[];
  overlayImages: Array<{ src: string; className?: string }>;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "symphny",
    name: "Symphny",
    thumbnail: "/images/20260411202416001.gif",
    categories: ["Branding", "Product", "Website"],
    hoverProps: [
      {
        src: "/images/Asset-2-1.svg",
        size: 88,
        anchor: "top-left",
        rotate: -14,
        delayIn: 0,
        delayOut: 120,
        yOffset: "12px",
      },
      {
        src: "/images/Frame-110.svg",
        size: 76,
        anchor: "top-right",
        rotate: 12,
        delayIn: 55,
        delayOut: 85,
        yOffset: "20px",
      },
      {
        src: "/images/Clip-path-group.svg",
        size: 92,
        anchor: "bottom-left",
        rotate: -10,
        delayIn: 110,
        delayOut: 45,
        yOffset: "-10px",
      },
      {
        src: "/images/Frame-47296.svg",
        size: 72,
        anchor: "bottom-right",
        rotate: 18,
        delayIn: 165,
        delayOut: 0,
        yOffset: "-8px",
      },
    ],
    overlayImages: [
      { src: "/images/20260411202416001.gif", className: "image-one-window" },
      { src: "/images/Frame-47417_1.avif", className: "image-one-window" },
      { src: "/images/Group-47633_1.avif", className: "image-one-window" },
    ],
  },
  {
    id: "safefaces",
    name: "Safe Faces",
    thumbnail: "/images/Group-47654-1.jpg",
    categories: ["Branding", "Product", "iOS"],
    hoverProps: [
      {
        src: "/images/Group-436-1.svg",
        size: 84,
        anchor: "top-left",
        rotate: -12,
        delayIn: 0,
        delayOut: 110,
        xOffset: "8px",
        yOffset: "24px",
      },
      {
        src: "/images/Vector-97.svg",
        size: 78,
        anchor: "top-right",
        rotate: 16,
        delayIn: 50,
        delayOut: 75,
        xOffset: "-10px",
        yOffset: "16px",
      },
      {
        src: "/images/Frame-47386.svg",
        size: 96,
        anchor: "left",
        rotate: 8,
        delayIn: 100,
        delayOut: 40,
        yOffset: "30px",
      },
      {
        src: "/images/Group-47669-1.svg",
        size: 74,
        anchor: "right",
        rotate: -18,
        delayIn: 130,
        delayOut: 20,
        yOffset: "-20px",
      },
      {
        src: "/images/Frame-47267-1.svg",
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
    thumbnail: "/images/Group-47629_1.avif",
    thumbnailClass: "u-image-cover",
    categories: ["Branding", "Product", "Website"],
    hoverProps: [
      {
        src: "/images/shipNetworkLogo.svg",
        size: 86,
        anchor: "top-left",
        rotate: -10,
        delayIn: 0,
        delayOut: 100,
        yOffset: "18px",
      },
      {
        src: "/images/Group-6.svg",
        size: 80,
        anchor: "top-right",
        rotate: 14,
        delayIn: 60,
        delayOut: 70,
        yOffset: "22px",
      },
      {
        src: "/images/Frame-47263.svg",
        size: 94,
        anchor: "bottom-right",
        rotate: -8,
        delayIn: 120,
        delayOut: 35,
        xOffset: "-6px",
      },
      {
        src: "/images/Group-2011.svg",
        size: 70,
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
