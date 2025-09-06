import { DefaultDegradationRules } from "../constants";

export const drugsList = [
  {
    name: "Doliprane",
    expiresIn: 20,
    benefit: 30,
    degradationRules: DefaultDegradationRules,
  },
  {
    name: "Herbal Tea",
    expiresIn: 10,
    benefit: 5,
    degradationRules: [{ daysBeforeExpiry: 0, degradation: 2 }],
    reverseDegradation: true,
  },
  {
    name: "Fervex",
    expiresIn: 12,
    benefit: 35,
    degradationRules: [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ],
    reverseDegradation: true,
    benefitDropToZeroAfterExpiration: true,
  },
  {
    name: "Magic Pill",
    expiresIn: 15,
    benefit: 40,
    degradationRules: [],
  },
];

export default drugsList;
