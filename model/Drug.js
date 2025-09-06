import { MIN_BENEFIT, MAX_BENEFIT } from "../constants/index.js";
export class Drug {
  constructor(
    name,
    expiresIn,
    benefit,
    degradationRules = [],
    reverseDegradation = false,
    benefitDropToZeroAfterExpiration = false,
  ) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.degradationRules = degradationRules;
    this.reverseDegradation = reverseDegradation;
    this.benefitDropToZeroAfterExpiration = benefitDropToZeroAfterExpiration;
  }

  getCurrentDegradationRule() {
    if (this.degradationRules.length === 0) {
      return this.degradationRules;
    }

    if (this.degradationRules.length > 0) {
      return this.degradationRules
        .filter((rule) => this.expiresIn <= rule.daysBeforeExpiry)
        .sort((a, b) => a.daysBeforeExpiry - b.daysBeforeExpiry)[0];
    }
  }

  updateExpiresIn() {
    this.expiresIn = this.expiresIn - 1;
  }

  updateBenefit() {
    if (this.benefitDropToZeroAfterExpiration && this.expiresIn < 0) {
      this.benefit = 0;
      return;
    }

    const defaultDegradation = this.reverseDegradation ? 1 : -1;
    const currentDegradationRule = this.getCurrentDegradationRule();

    const degradation = currentDegradationRule
      ? currentDegradationRule.degradation
      : defaultDegradation;

    const newBenefit = this.benefit + degradation;

    if (newBenefit < MIN_BENEFIT) {
      this.benefit = MIN_BENEFIT;
      return;
    } else if (newBenefit > MAX_BENEFIT) {
      this.benefit = MAX_BENEFIT;
      return;
    }
    this.benefit = newBenefit;
  }

  updateForNextDay() {
    if (this.degradationRules.length > 0) {
      this.updateExpiresIn();
      this.updateBenefit();
    }

    return this;
  }
}

export default Drug;
