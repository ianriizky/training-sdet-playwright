import { faker } from '@faker-js/faker';

export function generateRandomNumber(min: number, max: number): number {
  return faker.number.int({ min, max });
}
