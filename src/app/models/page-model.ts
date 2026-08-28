type PageSection = {
  heading: string;
  body?: string;
  items?: string[];
};

type PageContent = {
  title: string;
  intro: string;
  sections: PageSection[];
};
