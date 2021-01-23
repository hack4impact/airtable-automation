// Internals
import { FIELDS } from "./constants";

export type ProjectData = Record<keyof typeof FIELDS, string | string[]>;

export type Chapter =
  | "Cal Poly"
  | "Georgia Tech"
  | "Cornell"
  | "University of Maryland College Park"
  | "Boston University"
  | "University of Pennsylvania"
  | "McGill University"
  | "UIUC"
  | "Univ of Tennessee"
  | "Univ of Michigan"
  | "Carleton College"
  | "Drexel University"
  | "Princeton University";

export type ProjectStatus =
  | "In Progress"
  | "Delivered"
  | "Abandoned by Dev Team"
  | "Abandoned by Nonprofit"
  | "Unknown";

export type NonprofitFocus =
  | "Environmental Justice"
  | "Racial Justice"
  | "Political"
  | "Environmental Issues"
  | "Education"
  | "Poverty and Homelessness"
  | "Immigration"
  | "Gender Inequality"
  | "Healthcare"
  | "Animal Rights"
  | "LGBTQ Rights"
  | "Other"
  | "Criminal Justice";

export type WillingToInterview = "Yes" | "No" | "Unsure";

export type TimePeriod = "1m" | "6m" | "1y" | "3y" | "5y";

// For looping through time periods (MUST be largest to smallest)
export const TIME_PERIODS: TimePeriod[] = ["5y", "3y", "1y", "6m", "1m"];
export interface GoogleFormData {
  editUrl: string;
  publishedUrl: string;
}

export interface GoogleFormPostData {
  password: string;
  projectData: ProjectData;
  projectId: string;
  timePeriod: TimePeriod;
}

export type AppsScriptError =
  | "No Project ID found"
  | "No Project Name found"
  | "Wrong APPS_SCRIPT_PASSWORD"
  | "No Success Metric Questions found"
  | "No Time Period Found";

export const APPS_SCRIPT_ERRORS: AppsScriptError[] = [
  "No Project ID found",
  "No Project Name found",
  "Wrong APPS_SCRIPT_PASSWORD",
  "No Success Metric Questions found",
  "No Time Period Found",
];

export interface StandardQuestion {
  id: string;
  fields: StandardQuestionFields;
  createdTime: string;
}

export interface StandardQuestionFields {
  Question: string;
  Type?: "Single Line Text" | "Multi Line Text" | "Integer" | "Yes/No" | "0-10";
  "Time Periods"?: TimePeriod[];
  Order?: number;
  Required?: "True" | "False";
}
