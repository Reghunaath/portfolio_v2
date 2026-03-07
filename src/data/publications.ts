export interface Publication {
  title: string;
  authors: string;
  highlightedAuthor: string;
  journal: string;
  volume: string;
  pages: string;
  year: number;
  citations: number;
  url: string;
}

export const publications: Publication[] = [
  {
    title:
      "1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms",
    authors:
      "Muralidharan, K., Ramesh, A., Rithvik, G., Prem, S., Reghunaath, A. A., & Gopinath, M. P.",
    highlightedAuthor: "Reghunaath, A. A.",
    journal: "International Journal of Cognitive Computing in Engineering",
    volume: "2",
    pages: "130-143",
    year: 2021,
    citations: 56,
    url: "", // TODO: add paper link
  },
];
