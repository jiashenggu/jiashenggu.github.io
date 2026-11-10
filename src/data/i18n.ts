export type Language = "en" | "zh";

export const translateFor = (language: Language) =>
  (english: string, chinese: string): string => language === "zh" ? chinese : english;

export const resumePaths = {
  en: { page: "/resume/", pdf: "/resume/Jiasheng-Gu-Resume-en.pdf" },
  zh: { page: "/zh/resume/", pdf: "/zh/resume/Jiasheng-Gu-Resume-zh.pdf" },
} as const;
