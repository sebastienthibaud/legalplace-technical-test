import { Pharmacy } from "./pharmacy";
import { Drug } from "./drug";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", 1, 2)]);
  });

  it("should decrease the benefit twice as fast after expiration", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 3)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", -1, 1)]);
  });

  it("should not decrease the benefit below 0", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 0)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("test", 1, 0)]);
  });

  it("should increase the benefit of Herbal Tea as it gets older", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 5, 10)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Herbal Tea", 4, 11)]);
  });

  it("should not increase the benefit of Herbal Tea above 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Herbal Tea", 4, 50)]);
  });

  it("should increase the benefit of Fervex as it gets older", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 15, 10)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 14, 11)]);
    expect(
      new Pharmacy([new Drug("Fervex", 10, 10)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 9, 12)]);
    expect(
      new Pharmacy([new Drug("Fervex", 5, 10)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 4, 13)]);
  });

  it("should not increase the benefit of Fervex above 50", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 50)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", 4, 50)]);
  });

  it("should drop the benefit of Fervex to 0 after expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 10)]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should not change the benefit or expiresIn of Magic Pill", () => {
    expect(
      new Pharmacy([
        new Drug("Magic Pill", 10, 40, true),
      ]).updateDrugsForNextDay(),
    ).toEqual([new Drug("Magic Pill", 10, 40, true)]);
  });

  it("should handle a mix of drugs", () => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40, true),
    ];
    const pharmacy = new Pharmacy(drugs);
    expect(pharmacy.updateDrugsForNextDay()).toEqual([
      new Drug("Doliprane", 19, 29),
      new Drug("Herbal Tea", 9, 6),
      new Drug("Fervex", 11, 36),
      new Drug("Magic Pill", 15, 40, true),
    ]);
  });
});
