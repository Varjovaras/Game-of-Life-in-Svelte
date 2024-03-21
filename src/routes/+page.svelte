<script lang="ts">
	import { newEmptyGame, newGame, nextGeneration } from '$lib/gameOfLife/game';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	// biome-ignore lint/style/useConst: <explanation>
	let xAxis = 20;
	// biome-ignore lint/style/useConst: <explanation>
	let yAxis = 20;
	// biome-ignore lint/style/useConst: <explanation>
	let max = 60;
	let isPlaying = false;
	// biome-ignore lint/suspicious/noConfusingLabels: svelte tag
	$: game = newEmptyGame(xAxis, yAxis);

	const randomizeGrid = () => {
		game = newGame(xAxis, yAxis);
	};

	const resetGrid = () => {
		game = newEmptyGame(xAxis, yAxis);
		isPlaying = false;
	};

	const play = () => {
		isPlaying = true;
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
			<p>
				generation {game.generation}
			</p>
			<RangeSlider
				name="range-slider"
				bind:value={xAxis}
				on:change={randomizeGrid}
				max={60}
				step={1}
				ticked
			>
				<div class="flex items-center justify-between">
					<div class="font-bold">x axis</div>
					<div class="text-xs">{xAxis} / {max}</div>
				</div>
			</RangeSlider>
			<RangeSlider
				name="range-slider"
				bind:value={yAxis}
				on:change={randomizeGrid}
				max={60}
				step={1}
				ticked
			>
				<div class="flex items-center justify-between">
					<div class="font-bold">y axis</div>
					<div class="text-xs">{yAxis} / {max}</div>
				</div>
			</RangeSlider>
		</div>
	</div>
</div>
