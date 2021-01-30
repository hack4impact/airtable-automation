// Externals
import { config } from "dotenv-safe";
config();
import yargs from "yargs/yargs";
import Airtable from "airtable";

// Internals
import { getProjectSuccessData } from "./Helpers/Airtable";
// import { getSheetData, setSheetData, setUpSheets } from "./Helpers/Sheets";
import {
  checkSurveyNeeded,
  checkRequiredFields,
  checkProjectStatus,
  checkInUse,
} from "./Helpers/Checks";
import { sendReminderEmail } from "./Helpers/Email";
import { createGoogleForm } from "./Helpers/Forms";
import { parseProject } from "./Helpers/General";
import Logger from "./Helpers/Logger";
import { FIELDS } from "./Utils/constants";

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});

process.on("uncaughtException", (e) => {
  console.error(e);
  process.exit(1);
});

yargs(process.argv.slice(2)).argv;

const script = async () => {
  await Logger.setUp();
  const table = Airtable.base("app0TDYnyirqeRk1T");

  table("Projects")
    .select()
    .eachPage(
      async (projects, nextPage) => {
        for (const project of projects) {
          const data = parseProject(project);

          // Log the project's name
          console.log(`\n${Logger.bold(data.projectName)}`);

          const checkedData = checkRequiredFields(data);
          const { projectStatus, projectSuccessData } = checkedData;

          // If project is abandoned, don't perform any actions
          if (!checkProjectStatus(projectStatus)) return;

          const successData = await getProjectSuccessData(
            table,
            projectSuccessData
          );

          // If project is not in use by nonprofit, don't perform any actions
          if (!(await checkInUse(successData, project))) return;

          const surveyNeeded = checkSurveyNeeded(checkedData);

          if (surveyNeeded !== null) {
            const id = project.getId();
            await createGoogleForm(project, checkedData, id, surveyNeeded);
            await sendReminderEmail(checkedData, surveyNeeded);

            await project.updateFields({
              [FIELDS.lastSent]: surveyNeeded,
            });
          }
        }

        nextPage();
      },
      () => Logger.viewLogs()
    );
};

script();
