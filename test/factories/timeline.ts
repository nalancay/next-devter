import range from "lodash/range";
import { faker } from "@faker-js/faker";

const generateTimeline = (index: number) => {
  return {
    id: `${index++}`,
    avatar:
      "https://i.pinimg.com/originals/8c/bf/38/8cbf38ed5a8dbac4f8f5dd90bb7882d1.png",
    username: faker.random.word(),
    message: faker.random.words(10),
  };
};

export const generateTimesline = (numberOfTimesline = 10) =>
  [...range(numberOfTimesline)].map((index) => generateTimeline(index + 1));
