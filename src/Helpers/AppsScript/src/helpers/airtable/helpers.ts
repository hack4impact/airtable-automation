const AIRTABLE_AUTH = `Bearer ${process.env.AIRTABLE_API_KEY}`;

const BASE_API_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

export const airtableRequest = (
  table: string,
  headers?: GoogleAppsScript.URL_Fetch.HttpHeaders,
  params?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
): ReturnType<typeof UrlFetchApp.fetch> => {
  return UrlFetchApp.fetch(`${BASE_API_URL}/${encodeURI(table)}`, {
    headers: {
      Authorization: AIRTABLE_AUTH,
      ...headers,
    },
    ...params,
  });
};
