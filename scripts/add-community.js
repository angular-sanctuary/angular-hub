const fs = require('fs');
const community = require('./../add-community.json');

let communityRaw = fs.readFileSync(
  './angular-hub/src/public/assets/data/community.json',
);
let communityData = JSON.parse(communityRaw);
let json = JSON.stringify(
  [
    ...communityData,
    {
      ...community,
      events: [],
    },
  ],
  null,
  2,
);

fs.writeFileSync('./angular-hub/src/public/assets/data/community.json', json);
