import config from "../../angular.json" with { type: 'json' };

  export const getLocaleFilePaths = () => Object.values(config.projects["angular-hub"].i18n.locales).map((locale) => locale.translation);
