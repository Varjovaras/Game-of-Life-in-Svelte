import type { Grid, Row, Game, Cell } from './types';
import { randomizer } from './utils';

const newCell = (alive = false): Cell => {
	return alive;
};

const newRules = () => {
	return {
		underpopulation: 1,
		overpopulation: 4,
		reproduction: 3
	};
};

const newGrid = (xSize: number, ySize: number): Grid => {
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

const newEmptyGrid = (xSize: number, ySize: number): Grid => {
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

export const newGame = (x: number, y: number): Game => {
	const game: Game = { rules: newRules(), grid: newGrid(x, y), generation: 0, gameOver: false };
	return game;
};

export const newEmptyGame = (x: number, y: number): Game => {
	const game: Game = {
		rules: newRules(),
		grid: newEmptyGrid(x, y),
		generation: 0,
		gameOver: false
	};
	return game;
};

export const nextGeneration = (game: Game): Game => {
	const newGame = { ...game };
	const newGrid = JSON.parse(JSON.stringify(game.grid)); // Deep copy the grid

	for (let rowIndex = 0; rowIndex < game.grid.length; rowIndex++) {
		for (let cellIndex = 0; cellIndex < game.grid[rowIndex].length; cellIndex++) {
			const cell = game.grid[rowIndex][cellIndex];
			const adjacentCells = getAdjacentCells(game.grid, rowIndex, cellIndex);
			const aliveCells = adjacentCells.filter((cell: Cell) => cell === true).length;

			if (!cell && aliveCells === game.rules.reproduction) {
				newGrid[rowIndex][cellIndex] = true;
			}

			if (
				cell &&
				(aliveCells <= game.rules.underpopulation || aliveCells >= game.rules.overpopulation)
			) {
				newGrid[rowIndex][cellIndex] = false;
			}
		}
	}

	if (JSON.stringify(newGame.grid) === JSON.stringify(newGrid)) {
		newGame.gameOver = true;
		return newGame;
	}

	newGame.grid = newGrid;
	newGame.generation += 1;
	return newGame;
};

const getAdjacentCells = (grid: Grid, x: number, y: number): Cell[] => {
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
