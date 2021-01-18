// Externals
import { config } from "dotenv-safe";
config();
import yargs from "yargs/yargs";
import Airtable from "airtable";

// Internals
import { getAirtableTable } from "./Helpers/Airtable";
import { getSheetData, setSheetData, setUpSheets } from "./Helpers/Sheets";
import { checkSurveyNeeded, normalizeDate } from "./Helpers/General";
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
  const sheets = await setUpSheets();
  const sheetData = await getSheetData(sheets);

  const table = Airtable.base("app0TDYnyirqeRk1T");

  getAirtableTable(table, "Projects", (records, nextPage) => {
    records.forEach(async (record) => {
      const id = record.getId();
      const releaseDate = normalizeDate(record.get(FIELDS.releaseDate));

      const surveyType = checkSurveyNeeded(releaseDate, sheetData[id]);

      if (surveyType !== null) {
        const questions: string[] = FIELDS.questions.map((question) =>
          record.get(question)
        );

        console.log(surveyType);
        console.log(questions);

        await setSheetData(sheets, id, surveyType, sheetData[id]);
      }
    });

    nextPage();
  });
};

script();
