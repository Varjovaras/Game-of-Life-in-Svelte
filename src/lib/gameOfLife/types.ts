export type Cell = boolean;

export type Row = Cell[];
export type Grid = Row[];

export type Rules = {
	underpopulation: number;
	overpopulation: number;
	reproduction: number;
	speed: number;
};

export type Game = {
	rules: Rules;
	grid: Grid;
	generation: number;
	gameOver: boolean;
};

export type GridDetails = {
	x: number;
	y: number;
	xMax: number;
	yMax: number;
};
