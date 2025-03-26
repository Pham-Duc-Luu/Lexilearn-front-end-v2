import _ from 'lodash';

export function arrangeColumns<T>(
  list: ({ itemHeight: number } & T)[],
  number_of_columns: number = 3
): T[][] {
  let array = Array(number_of_columns).fill([]);
  let counterArray = Array(number_of_columns).fill(0);

  for (let i = 0; i < list.length; i++) {
    const minValue = _.min(counterArray); // Find the smallest value
    const minIndex = _.indexOf(counterArray, minValue); // Get the index

    array[minIndex] = [...array[minIndex], list[i]]; // Add the item to the smallest column
    counterArray[minIndex] = counterArray[minIndex] + list[i].itemHeight; // Increment the counter for the smallest column
  }

  return array;
}
