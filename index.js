import { Pharmacy, Drug } from "./pharmacy";
import drugsList from "./data/drugsList";

import fs from "fs";

const drugs = drugsList.map(
  (drug) =>
    new Drug(
      drug.name,
      drug.expiresIn,
      drug.benefit,
      drug.defaultBenefitDegradation,
      drug.degradationRules,
      drug.benefitDropToZeroAfterExpiration,
    ),
);
const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  const pharmacyValues = pharmacy.updateBenefitValue();

  const sanitizedDrugsValues = pharmacyValues.map((drug) => ({
    name: drug.name,
    expiresIn: drug.expiresIn,
    benefit: drug.benefit,
  }));

  log.push(JSON.parse(JSON.stringify(sanitizedDrugsValues)));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
