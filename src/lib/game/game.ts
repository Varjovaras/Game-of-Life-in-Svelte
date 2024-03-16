export type Cell = {
	value: string;
	isAlive: boolean;
};
export type Row = Cell[];
export type Grid = Row[];
export type Rules = {
	underpopulation: number;
	overpopulation: number;
	reproduction: number;
};

type Game = {
	rules: Rules;
	grid: Grid;
};

const newRules = (): Rules => {
	return {
		underpopulation: 1,
		overpopulation: 4,
		reproduction: 3
	};
};

const newGrid = (): Grid => {
	return [[]];
};

const newGame = (): Game => {
	return { rules: newRules(), grid: newGrid() };
};
