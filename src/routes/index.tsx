import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krishna Mishra — Software Engineer & Full Stack Developer" },
      { name: "description", content: "Portfolio of Krishna Mishra: full-stack web platforms, mobile apps, AI integrations. Care Connect, Rail-Vision AI, Gyan AI, and more." },
      { property: "og:title", content: "Krishna Mishra — Software Engineer & Full Stack Developer" },
      { property: "og:description", content: "Full-stack and mobile engineering portfolio crafted with precision." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Krishna Mishra",
          jobTitle: "Software Engineer, Full Stack & Mobile Developer",
          url: "/",
          sameAs: [
            "https://github.com/",
            "https://linkedin.com/",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
