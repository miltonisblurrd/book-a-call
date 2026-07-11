export type Testimonial = {
  name: string;
  avatar: string;
  logo?: {
    src: string;
    srcSet?: string;
    sizes?: string;
    cover?: boolean;
  };
  quoteHtml: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Smith",
    avatar: "/images/1634599442789.jpg",
    logo: { src: "/images/rak-logo-brand-v1-5.svg" },
    quoteHtml:
      "Milton is exceptional at all things web! I worked with Milton for about four years and during that time I can say with certainty - Milton is outstanding!<br><br>When I hired Milton, there were quite a few major projects with short turnaround times, including working on the current website while simultaneously building a new website on a completely different platform. Not only did Milton get up to speed quickly, but excelled in meeting the deadlines with exceptional final products.<br><br>Milton is an early adopter and uses his tech knowledge to his advantage. I highly recommend Milton. He was a joy to manage and always a top producer.",
  },
  {
    name: "Isaac Amaya",
    avatar: "/images/Frame-47425.png",
    logo: { src: "/images/Group-37-1-2.svg" },
    quoteHtml:
      "Blurrd helped us take our iOS app from idea to reality in just two weeks. From the first call, they understood our vision, nailed the design direction, and moved straight into build without missing a beat. The app was clean, intuitive, and ready for user testing ahead of schedule. It's rare to find a studio that moves fast <em>and</em> gets the details right — Blurrd delivered both.",
  },
  {
    name: "Craig Harrison",
    avatar: "/images/unnamed-1.png",
    logo: { src: "/images/Vector-97.svg" },
    quoteHtml:
      "Milton was amazing to work with. He helped us every step of the from concepts, to design, and complete development of our Webflow site. His designs were very innovative and he has full ability to turn those designs into perfectly developed pages",
  },
  {
    name: "Wendy Feng",
    avatar: "/images/1736293447327.jpg",
    logo: { src: "/images/Group-2008-1.svg" },
    quoteHtml:
      "Milton's not here to play the game, he's here to change it.<br><br>I got to work side-by-side with Milton for the past year and a half and during that time, he's consistently shown positive results in leads and conversions along with an immense dedication to his craft. Milton has an undeniable passion for web development, design, and UI/UX plus the ability to conceptualize, strategize, and execute on any given project from start to finish. Milton is someone I can always count on. He is a compassionate team player and thinks as a leader. For him, staying up-to-date with trends is a given, but to think ahead and optimize for the future is his secret sauce. <br><br>Milton will surely play an instrumental partner for any company looking for a genuine, forward-thinking developer with a passion in building and shaping the culture of Web.",
  },
  {
    name: "Carolina Cano-Espinoza",
    avatar: "/images/1671735926855.jpg",
    logo: { src: "/images/64cd224f52d06dbfde1bba25_firstmile-logo-only-11-4.svg" },
    quoteHtml:
      "Milton's passion for Web Design and Development shines through in every project he takes on. I have worked with Milton for the last 6 years on a close-knit marketing team. Not only is he naturally talented at turning a vision or concept into reality, but he also finds a way to bring in the latest web elements into our strategy to ensure we are leaders in our industry. I lean on Milton to develop a wholistic web strategy that complements our long-term marketing initiatives and short-term campaign goals. His expertise in web design and web development has elevated user experience and increased conversion rates for our organization. I highly recommend Milton for any role looking to bring their web development strategy to the next level.",
  },
  {
    name: "Izabel Perez",
    avatar: "/images/Frame-47426-1.png",
    logo: {
      src: "/images/28c56b96-1f21-4171-8d0c-636740735fba.png",
      srcSet:
        "/images/28c56b96-1f21-4171-8d0c-636740735fba-p-500.png 500w, /images/28c56b96-1f21-4171-8d0c-636740735fba-p-800.png 800w, /images/28c56b96-1f21-4171-8d0c-636740735fba-p-1080.png 1080w, /images/28c56b96-1f21-4171-8d0c-636740735fba.png 1536w",
      sizes: "100vw",
      cover: true,
    },
    quoteHtml:
      "I had a great experience working with Milton at Blurrd Studio. He was attentive to my ideas, quick responses, and incredibly skilled at bringing my vision to life. The final website looks clean, professional, and functions seamlessly across all devices. TY Milton!!",
  },
  {
    name: "Alex Pereszlenyi",
    avatar: "/images/unnamed-2.png",
    quoteHtml:
      "Milton is not only a skilled developer, but he has the creativity and vision for businesses and brands that can push them into the next tier. You can see that in the way that BLURRD Studio approaches solutions that leverage the unique strengths of whoever they are working with. It's difficult to replicate the ingenuity and the trust you have with BLURRD.",
  },
  {
    name: "Solomon Davis",
    avatar: "/images/b9jqaLia_400x400.jpg",
    quoteHtml:
      "Milton and the BLURRD Studio team are an invaluable asset to any project. They bring a wealth of knowledge and a deep commitment to producing high-quality work that reflects genuine care and craftsmanship.",
  },
  {
    name: "Charlie Pachas",
    avatar: "/images/DTpXqnlD_400x400.jpg",
    quoteHtml:
      "Milton by far is one of the most knowledgeable, hardworking and top notch web developers out there. He is guaranteed to bring whatever you dream of to life, exceed expectations and give you quality service all at the same time. I couldn't be more happy with the site he developed for me. You can tell he really has a passion for what he's doing. Thank you Blurrd Studio for all the help!",
  },
  {
    name: "FendiSean",
    avatar: "/images/DTpXqnlD_400x400.jpg",
    quoteHtml:
      "I love using the website Milton designed for me! Helps a lot with all that i got going on. I have easy access to my videos, photos and links to my music and he was able to secure a easy name for my website which is my artist name so everybody can easily access the website. He pays very close attention to detail!",
  },
  {
    name: "Vending Nerds",
    avatar: "/images/DTpXqnlD_400x400.jpg",
    logo: { src: "/images/rak-logo-brand-v1-5.svg" },
    quoteHtml:
      "We just want to thank Milton at BLURRD Studio for their fantastic work on our website. He went beyond our expectations and made the process easy and stress free. If you are looking for a web developer who is ACTUALLY knowledgeable, Milton is the guy for you. Can not thank him enough!!",
  },
];
