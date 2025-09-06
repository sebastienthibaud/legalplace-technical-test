export class Drug {
  constructor(name, expiresIn, benefit, neverExpires = false) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.neverExpires = neverExpires;
  }

  updateExpiresIn() {
    this.expiresIn = this.expiresIn - 1;
  }

  updateForNextDay() {
    if (this.name != "Herbal Tea" && this.name != "Fervex") {
      if (this.benefit > 0) {
        if (this.name != "Magic Pill") {
          this.benefit = this.benefit - 1;
        }
      }
    } else {
      if (this.benefit < 50) {
        this.benefit = this.benefit + 1;
        if (this.name == "Fervex") {
          if (this.expiresIn < 11) {
            if (this.benefit < 50) {
              this.benefit = this.benefit + 1;
            }
          }
          if (this.expiresIn < 6) {
            if (this.benefit < 50) {
              this.benefit = this.benefit + 1;
            }
          }
        }
      }
    }
    if (!this.neverExpires) {
      this.updateExpiresIn();
    }
    if (this.expiresIn < 0) {
      if (this.name != "Herbal Tea") {
        if (this.name != "Fervex") {
          if (this.benefit > 0) {
            if (this.name != "Magic Pill") {
              this.benefit = this.benefit - 1;
            }
          }
        } else {
          this.benefit = this.benefit - this.benefit;
        }
      } else {
        if (this.benefit < 50) {
          this.benefit = this.benefit + 1;
        }
      }
    }

    return this;
  }
}

export default Drug;
