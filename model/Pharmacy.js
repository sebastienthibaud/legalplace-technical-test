export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateDrugsForNextDay() {
    this.drugs.forEach((drug) => {
      drug.updateForNextDay();
    });

    return this.drugs;
  }
}

export default Pharmacy;
