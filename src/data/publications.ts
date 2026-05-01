export interface Publication {
  key: string;
  title: string;
  description: string;
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
    description:
      "Classifies six human activities (sitting, standing, walking, stair climbing, laying down) from smartphone accelerometer and gyroscope data. Benchmarks classic ML algorithms — Logistic Regression, Linear & Kernel SVM, Decision Tree, Random Forest — against a proposed feed-forward DNN and 1D CNN. Evaluated on Recall, Precision, and F1 score; SVM and the proposed 1D CNN emerged as the best-performing models.",
    journal: "International Journal of Cognitive Computing in Engineering",
    year: 2021,
    citations: 63,
    url: "https://www.sciencedirect.com/science/article/pii/S2666307421000140",
    scholarUrl: "https://scholar.google.com/citations?user=C9GVXKYAAAAJ&hl=en&authuser=1",
  },
];
