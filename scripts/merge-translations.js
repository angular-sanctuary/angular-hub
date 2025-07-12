import { readFile, writeFile } from "node:fs/promises";
import config from '../angular.json' with { type: 'json' };
import messagesFile from '../messages.json' with { type: 'json' };

const localesFilePaths = Object.values(config.projects["angular-hub"].i18n.locales).map((locale) => locale.translation);

const messages = Object.entries(messagesFile.translations);

const newLocales = await Promise.all(localesFilePaths.map(async (localeFilePath) => {
  const localeFile = await readFile(localeFilePath, { encoding: 'utf-8' });

  const localeFileData = JSON.parse(localeFile);

  const updatedTranslations = messages.reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: key in localeFileData.translations ? localeFileData.translations[key] : value
    }
  }, {});

  return {
    file: localeFilePath,
    data: {
      ...localeFileData,
      translations: updatedTranslations
    }
  };
}));

await Promise.all(newLocales.map(async (newLocale) => {
  return writeFile(newLocale.file, JSON.stringify(newLocale.data, null, "\t"), { encoding: 'utf-8' })
}))

