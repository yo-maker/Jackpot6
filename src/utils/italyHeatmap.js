/**
 * Column-based heatmap for Italy 10e
 */
export function buildItalyHeatmap(draws, columns) {
  const map = {};

  columns.forEach(([min, max], idx) => {
    map[idx] = {};
    for (let n = min; n <= max; n++) {
      map[idx][n] = 0;
    }
  });

  draws.forEach((draw) => {
    draw.numbers.forEach((num) => {
      columns.forEach(([min, max], idx) => {
        if (num >= min && num <= max) {
          map[idx][num]++;
        }
      });
    });
  });

  return map;
}
