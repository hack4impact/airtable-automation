import { TimePeriod, TIME_PERIODS } from "./types";

type PublishedURLField = `(${TimePeriod}) Google Form Published URL`;

export const createPublishedURLField = (
  timePeriod: TimePeriod
): PublishedURLField =>
  `(${timePeriod}) Google Form Published URL` as PublishedURLField;

type QuestionNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type Question = `Success Metric Question ${QuestionNum}`;

export const FIELDS = {
  // Register Info
  representativeName: "Representative Name",
  representativeEmail: "Representative Email",

  // Project Info
  projectName: "Project Name",
  projectStatus: "Project Status",
  teamMembers: "Team Members",
  deliveryDate: "(Anticipated) Delivery Date",
  creationSemester: "Creation Semester",
  projectLeads: "Project Leads (PM, Tech Lead, Designer)",
  prd: "PRD",

  // Questions Info
  successQuestions: [...Array(8)].map(
    (x, i) => `Success Metric Question ${i + 1}` as Question
  ),
  googleFormPublishedUrls: TIME_PERIODS.map(createPublishedURLField),
  lastSent: "Last Sent Out",
  projectSuccessData: "Project Success Data",

  // Chapter Info
  chapter: "Chapter",
  chapterName: "Chapter Name",
  chapterEmail: "Chapter Email",

  // Nonprofit
  nonprofitName: "Nonprofit Partner Name",
  nonprofitWebsite: "Nonprofit Partner Website",
  nonprofitFocus: "Nonprofit Focus",
  nonprofitContactName: "Nonprofit Point of Contact Name",
  nonprofitContactEmail: "Nonprofit Point of Contact Email",
  willingToInterview: "Willing to Interview?",
  onboarded: "Onboarded?",
} as const;

export const DATA_FIELDS = {
  projectName: "Project Name",
  isStillUsing: "Are you still using the product?",
};

export const SPREADSHEET_ID = "11O5zz8ff1GpWQrGdnmy973Wc7NoU3G_-RHoaFULa4Gk";
