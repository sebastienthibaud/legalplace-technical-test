import { DefaultDegradationRules } from "../constants";

export const drugsList = [
  {
    name: "Doliprane",
    expiresIn: 20,
    benefit: 30,
    defaultBenefitDegradation: -1,
    degradationRules: [DefaultDegradationRules],
  },
  {
    name: "Herbal Tea",
    expiresIn: 10,
    benefit: 5,
    defaultBenefitDegradation: 1,
    degradationRules: [{ daysBeforeExpiry: 0, degradation: 2 }],
    reverseDegradation: true,
  },
  {
    name: "Fervex",
    expiresIn: 12,
    benefit: 35,
    defaultBenefitDegradation: 1,
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
    defaultBenefitDegradation: 0,
    degradationRules: [],
  },
  {
    name: "Dafalgan",
    expiresIn: 5,
    benefit: 20,
    defaultBenefitDegradation: -2,
    degradationRules: [DefaultDegradationRules],
  },
];

export default drugsList;
