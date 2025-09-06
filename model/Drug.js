import { MIN_BENEFIT, MAX_BENEFIT } from "../constants/index.js";
export class Drug {
  constructor(
    name,
    expiresIn,
    benefit,
    defaultBenefitDegradation = -1,
    degradationRules = [],
    benefitDropToZeroAfterExpiration = false,
  ) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.defaultBenefitDegradation = defaultBenefitDegradation;
    this.degradationRules = degradationRules;
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

    const currentDegradationRule = this.getCurrentDegradationRule();

    const degradation = currentDegradationRule
      ? currentDegradationRule.degradation
      : this.defaultBenefitDegradation;

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
