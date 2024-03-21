<script lang="ts">
	import { newEmptyGame, newGame, nextGeneration } from '$lib/gameOfLife/game';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	const gridDetails = {
		x: 20,
		y: 10,
		max: 60
	};

	let isPlaying = false;
	// biome-ignore lint/suspicious/noConfusingLabels: svelte tag
	$: game = newEmptyGame(gridDetails.x, gridDetails.y);

	const randomizeGrid = () => {
		game = newGame(gridDetails.x, gridDetails.y);
	};

	const resetGrid = () => {
		game = newEmptyGame(gridDetails.x, gridDetails.y);
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
				<div class="flex justify-center">
					{#each row as cell, y}
						<button
							style="padding:0; margin:0; border:none; box-sizing: border-box; line-height: 1;"
							on:click={() => toggleCell(x, y)}
						>
							{cell ? '🟩' : '⬛'}
						</button>
					{/each}
				</div>
			{/each}

			<p>
				generation {game.generation}
			</p>
			<div class="justify-center px-12">
				<RangeSlider
					name="range-slider"
					bind:value={gridDetails.x}
					on:change={randomizeGrid}
					max={gridDetails.max}
					step={1}
				>
					<div class="flex items-center justify-between">
						<div class="font-bold">x axis</div>
						<div class="text-xs">{gridDetails.x} / {gridDetails.max}</div>
					</div>
				</RangeSlider>
				<RangeSlider
					name="range-slider"
					bind:value={gridDetails.y}
					on:change={randomizeGrid}
					max={gridDetails.max}
					step={1}
				>
					<div class="flex items-center justify-between">
						<div class="font-bold">y axis</div>
						<div class="text-xs">{gridDetails.y} / {gridDetails.max}</div>
					</div>
				</RangeSlider>
			</div>
		</div>
	</div>
</div>
