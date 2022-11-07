import { CAR_API_URL, CAR_FUELTYPE, CAR_SEGMENT } from "./constant";
import { createInstance } from "./createInstance";

export class CarAPI {
  #API;
  #instance;
  #fuelType;
  #segment;

  constructor(url) {
    this.#instance = createInstance({
      url: url,
      config: {
        timeout: 3000,
      },
    });
    this.#API = CAR_API_URL;
    this.#fuelType = CAR_FUELTYPE;
    this.#segment = CAR_SEGMENT;
  }

  getAllCar() {
    return this.#instance.get(this.#API.cars);
  }

  getFuelTypeSegmentCars({ fuelType, segment }) {
    return this.#instance.get(this.#API.cars, {
      params: {
        fuelType,
        segment,
      },
    });
  }

  getFuelTypeCars({ fuleType }) {
    return this.#instance.get(this.#API.cars, {
      params: {
        fuleType,
      },
    });
  }

  async getSegmentCars({ segment }) {
    return this.#instance.get(this.#API.cars, {
      params: {
        segment,
      },
    });
  }

  async getSmallCars() {
    return this.getSegmentCars({ segment: this.#segment.small });
  }

  async getMediumCars() {
    return this.getSegmentCars({ segment: this.#segment.medium });
  }

  async getLargeCars() {
    return this.getSegmentCars({ segment: this.#segment.large });
  }

  async getSuvCars() {
    return this.getSegmentCars({ segment: this.#segment.suv });
  }
}
