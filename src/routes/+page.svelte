<script lang="ts">
	import { newEmptyGame, newGame, nextGeneration } from '$lib/gameOfLife/game';

	const dimensions = {
		x: 20,
		y: 20
	};

	let game = newEmptyGame(dimensions.x, dimensions.y);
	let isPlaying = false;

	const randomizeGrid = () => {
		game = newGame(dimensions.x, dimensions.y);
	};

	const resetGrid = () => {
		game = newEmptyGame(dimensions.x, dimensions.y);
		isPlaying = false;
	};

	const play = () => {
		isPlaying = true;
		game = nextGeneration(game);
		game = nextGeneration(game);
		setTimeout(() => {
			if (isPlaying) {
				play();
			}
		}, 100);
	};

	const toggleCell = (x: number, y: number) => {
		game.grid[x][y] = !game.grid[x][y];
	};
</script>

<div class="flex min-h-screen flex-col justify-center">
	<div class="container mx-auto space-y-8 overflow-auto p-8 text-center">
		<h1 class="h1">Game of <span class="text-green-400">life</span> Simulator</h1>
		<button class="variant-filled btn" on:click={randomizeGrid}>random board</button>
		<button class="variant-filled btn" on:click={resetGrid}>reset grid</button>

		<button class="variant-filled btn" on:click={play}>play game</button>

		<div class="space-x-0 space-y-0">
			{#each game.grid as row, x}
				<div class="flex justify-center text-center">
					{#each row as cell, y}
						<button class="" on:click={(cell) => toggleCell(x, y)}>
							{cell ? '🟩' : '⬛'}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
