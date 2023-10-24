import { expect, test } from "vitest";
import { createDebouncedQueue } from "./debounced-queue";

const item1 = "1";
const item2 = "2";
const item3 = "3";

test("calls the callback with only the items pushed before the delay", async () => {
  let callback: (items: Array<string>) => void;
  const delay = 200;
  const deferred = new Promise((resolve) => {
    callback = resolve;
  });

  const queue = createDebouncedQueue<string>((items) => {
    callback(items);
    return Promise.resolve();
  }, delay);

  queue.push(item1);

  // Add more items befire the delay
  setTimeout(() => {
    queue.push(item2);
  }, delay / 2);

  // Add more items but after the delay
  setTimeout(() => {
    queue.push(item3);
  }, 2 * delay);

  expect(deferred).resolves.toStrictEqual([item1, item2]);
});

test("calls the callback a one more time with the items pushed during the first callback", async () => {
  let callback: (items: Array<string>) => void;
  const deferred = new Promise((resolve) => {
    callback = resolve;
  });
  let callback2: (items: Array<string>) => void;
  const deferred2 = new Promise((resolve) => {
    callback2 = resolve;
  });

  const queue = createDebouncedQueue<string>((items) => {
    callback(items);
    callback = callback2;
    queue.push(item2);
    queue.push(item3);
    return Promise.resolve();
  }, 200);

  queue.push(item1);
  expect(deferred).resolves.toStrictEqual([item1]);
  expect(deferred2).resolves.toStrictEqual([item2, item3]);
});
