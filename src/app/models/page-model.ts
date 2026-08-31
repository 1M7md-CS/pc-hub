export type PageSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type PageContent = {
  title: string;
  intro: string;
  sections: PageSection[];
};
