export interface Publication {
  key: string;
  title: string;
  journal: string;
  year: number;
  citations: number;
  url: string;
  scholarUrl?: string;
}

export const publications: Publication[] = [
  {
    key: "ajith2021activity",
    title:
      "1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms",
    journal: "International Journal of Cognitive Computing in Engineering",
    year: 2021,
    citations: 63,
    url: "https://www.sciencedirect.com/science/article/pii/S2666307421000140",
    scholarUrl: "https://scholar.google.com/citations?user=C9GVXKYAAAAJ&hl=en&authuser=1",
  },
];
