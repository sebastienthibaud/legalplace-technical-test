import { Pharmacy } from "./pharmacy";
import { Drug } from "./drug";
import { DefaultDegradationRules } from "../constants";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 3, [DefaultDegradationRules]),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", 1, 2, [DefaultDegradationRules])]);
  });

  it("should decrease the benefit twice as fast after expiration", () => {
    expect(
      new Pharmacy([
        new Drug("test", 0, 3, [DefaultDegradationRules]),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", -1, 1, [DefaultDegradationRules])]);
  });

  it("should not decrease the benefit below 0", () => {
    expect(
      new Pharmacy([
        new Drug("test", 2, 0, [DefaultDegradationRules]),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", 1, 0, [DefaultDegradationRules])]);
  });

  it("should increase the benefit of Herbal Tea as it gets older", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 5, 10, experitationRules, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Herbal Tea", 4, 11, experitationRules, true)]);
  });

  it("should not increase the benefit of Herbal Tea above 50", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 5, 50, experitationRules, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Herbal Tea", 4, 50, experitationRules, true)]);
  });

  it("should increase the benefit twice of Herbal Tea after expiration", () => {
    const experitationRules = [{ daysBeforeExpiry: 0, degradation: 2 }];

    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 0, 10, experitationRules, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Herbal Tea", -1, 12, experitationRules, true)]);
  });

  it("should not change the benefit or expiresIn of Magic Pill", () => {
    const expirationRules = [];

    expect(
      new Pharmacy([
        new Drug("Magic Pill", 10, 40, expirationRules),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Magic Pill", 10, 40, expirationRules)]);
  });

  it("should increase the benefit of Fervex as it gets older", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 15, 10, experitationRules, true, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 14, 11, experitationRules, true, true)]);
  });

  it("should increase the benefit of Fervex by 2 when there are 10 days or less", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 10, 10, experitationRules, true, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 9, 12, experitationRules, true, true)]);
  });

  it("should increase the benefit of Fervex by 3 when there are 5 days or less", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 5, 10, experitationRules, true, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 4, 13, experitationRules, true, true)]);
  });

  it("should not increase the benefit of Fervex above 50", () => {
    const experitationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 5, 50, experitationRules, true, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 4, 50, experitationRules, true, true)]);
  });

  it("should drop the benefit of Fervex to 0 after expiration", () => {
    const expirationRules = [
      { daysBeforeExpiry: 10, degradation: 2 },
      { daysBeforeExpiry: 5, degradation: 3 },
    ];

    expect(
      new Pharmacy([
        new Drug("Fervex", 0, 10, expirationRules, true, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", -1, 0, expirationRules, true, true)]);
  });

  it("should handle a mix of drugs", () => {
    const drugs = [
      new Drug("test", 2, 3, [DefaultDegradationRules]),
      new Drug(
        "Herbal Tea",
        5,
        10,
        [{ daysBeforeExpiry: 0, degradation: 2 }],
        true,
      ),
      new Drug("Magic Pill", 10, 40, []),
    ];

    expect(new Pharmacy(drugs).updateDrugsForNextDay()).toEqual([
      new Drug("test", 1, 2, [DefaultDegradationRules]),
      new Drug(
        "Herbal Tea",
        4,
        11,
        [{ daysBeforeExpiry: 0, degradation: 2 }],
        true,
      ),
      new Drug("Magic Pill", 10, 40, []),
    ]);
  });
});
