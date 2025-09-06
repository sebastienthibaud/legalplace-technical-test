import { Pharmacy, Drug } from "./pharmacy";
import { DefaultDegradationRules } from "./constants";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 3, -1, [DefaultDegradationRules]),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("test", 1, 2)]);
  });

  it("should decrease the benefit twice as fast after expiration", () => {
    expect(
      new Pharmacy([
        new Drug("test", 0, 3, -1, [DefaultDegradationRules]),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("test", -1, 1)]);
  });

  it("should not decrease the benefit below 0", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 0, -1, [DefaultDegradationRules]),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("test", 1, 0)]);
  });

  it("should increase the benefit of Herbal Tea as it gets older", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 5, 10, 1, experitationRules),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 4, 11)]);
  });

  it("should not increase the benefit of Herbal Tea above 50", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 5, 50, 1, experitationRules),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 4, 50)]);
  });

  it("should increase the benefit twice of Herbal Tea after expiration", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 0, 10, 1, experitationRules),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", -1, 12)]);
  });

  it("should not change the benefit or expiresIn of Magic Pill", () => {
    const expirationRules = [];

    expect(
      new Pharmacy([
        new Drug("Magic Pill", 10, 40, 0, expirationRules),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Magic Pill", 10, 40)]);
  });

  it("should increase the benefit of Fervex as it gets older", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 15, 10, 1, experitationRules, true),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 14, 11)]);
  });

  it("should increase the benefit of Fervex by 2 when there are 10 days or less", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 10, 10, 1, experitationRules, true),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 9, 12)]);
  });

  it("should increase the benefit of Fervex by 3 when there are 5 days or less", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 5, 10, 1, experitationRules, true),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 13)]);
  });

  it("should not increase the benefit of Fervex above 50", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 5, 50, 1, experitationRules, true),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 50)]);
  });

  it("should drop the benefit of Fervex to 0 after expiration", () => {
    const expirationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 0, 10, 1, expirationRules, true),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should decrease the benefit twice for Dafalgan", () => {
    const expirationRules = [DefaultDegradationRules];

    expect(
      new Pharmacy([
        new Drug("Dafalgan", 2, 10, -2, expirationRules),
      ]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", 1, 8)]);
  });

  it("should handle a mix of drugs", () => {
    const drugs = [
      new Drug("test", 2, 3, -1, [DefaultDegradationRules]),
      new Drug("Herbal Tea", 5, 10, 1, [
        { daysBeforeExpiry: 0, degradation: 2 },
      ]),
      new Drug("Magic Pill", 10, 40, 0, []),
    ];

    expect(new Pharmacy(drugs).updateBenefitValue()).toEqual([
      new Drug("test", 1, 2),
      new Drug("Herbal Tea", 4, 11),
      new Drug("Magic Pill", 10, 40),
    ]);
  });
});
