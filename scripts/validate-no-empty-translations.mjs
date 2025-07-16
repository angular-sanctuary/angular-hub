import {getLocaleFilePaths} from "./translations/get-locale-files.mjs";
import {readFile} from "node:fs/promises";

const localesFilePaths = getLocaleFilePaths();

const missingKeysPerLocale = await Promise.all(localesFilePaths.map(async (localeFilePath) => {
  const localeFile = await readFile(localeFilePath, { encoding: 'utf-8' });

  return {
    localeFilePath,
    missingTranslations: Object.entries(JSON.parse(localeFile).translations).filter(([_key, value]) => value === "").map(([key]) => key),
  }
}));

const hasMissingTranslations = missingKeysPerLocale.some((file) => file.missingTranslations.length);

if (hasMissingTranslations) {
  console.error('Missing translations', missingKeysPerLocale);
  process.exitCode = 1;
}else {
  process.exit(0);
}
