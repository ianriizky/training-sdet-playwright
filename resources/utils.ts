import { faker } from '@faker-js/faker';

export function generateRandomNumber(min: number, max: number): number {
  return faker.number.int({ min, max });
}

export function toKebabCase(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}
