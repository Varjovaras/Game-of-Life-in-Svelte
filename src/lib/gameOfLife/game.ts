import type { Game, Cell, Rules } from './types';
import { getAdjacentCells, newEmptyGrid, newGrid, newRules } from './utils';

export const newGame = (x: number, y: number): Game => {
	const game: Game = { rules: newRules(), grid: newGrid(x, y), generation: 0, gameOver: false };
	return game;
};

export const newEmptyGame = (x: number, y: number, rules: Rules): Game => {
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
