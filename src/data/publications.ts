export interface Publication {
  key: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  citations: number;
  url: string;
}

export const publications: Publication[] = [
  {
    key: "ajith2021activity",
    title:
      "1D Convolution approach to human activity recognition using wearable sensors in the wild",
    authors: "Ajith Kumar Ahila, R. et al.",
    journal: "International Journal of Cognitive Computing in Engineering",
    year: 2021,
    citations: 56,
    url: "", // TODO: add paper URL
  },
];
