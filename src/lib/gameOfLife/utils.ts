import type { Cell, Grid, Row } from './types';

export const randomizer = () => {
	return Math.random() > 0.8;
};

export const newCell = (alive = false): Cell => {
	return alive;
};

export const newRules = () => {
	return {
		underpopulation: 1,
		overpopulation: 4,
		reproduction: 3
	};
};

export const newGrid = (xSize: number, ySize: number): Grid => {
	const grid: Grid = [];
	for (let i = 0; i < ySize; i++) {
		const row: Row = [];
		for (let j = 0; j < xSize; j++) {
			row.push(newCell(randomizer()));
		}
		grid.push(row);
	}
	return grid;
};

export const newEmptyGrid = (xSize: number, ySize: number): Grid => {
	const grid: Grid = [];
	for (let i = 0; i < ySize; i++) {
		const row: Row = [];
		for (let j = 0; j < xSize; j++) {
			row.push(newCell());
		}
		grid.push(row);
	}
	return grid;
};

export const getAdjacentCells = (grid: Grid, x: number, y: number): Cell[] => {
	const adjacentCells: Cell[] = [];

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const newX = x + i;
			const newY = y + j;

			// Skip the cell itself
			if (i === 0 && j === 0) {
				continue;
			}

			// Check if the coordinates are within the grid
			if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
				adjacentCells.push(grid[newX][newY]);
			}
		}
	}

	return adjacentCells;
};
