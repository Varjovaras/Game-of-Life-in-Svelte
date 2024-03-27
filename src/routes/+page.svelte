<script lang="ts">
	import { newEmptyGame, newGame, nextGeneration } from '$lib/gameOfLife/game';
	import type { GridDetails, Rules } from '$lib/gameOfLife/types';
	import { ruleMaximums } from '$lib/gameOfLife/utils';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	const gridDetails: GridDetails = {
		x: 20,
		y: 10,
		xMax: 40,
		yMax: 20
	};

	const rules: Rules = {
		underpopulation: 1,
		overpopulation: 4,
		reproduction: 3,
		speed: 100
	};

	let isPlaying = false;
	// biome-ignore lint/suspicious/noConfusingLabels: svelte tag
	$: game = newEmptyGame(gridDetails.x, gridDetails.y, rules);

	const randomizeGrid = () => {
		game = newGame(gridDetails.x, gridDetails.y);
	};

	const resetGrid = () => {
		game = newEmptyGame(gridDetails.x, gridDetails.y, rules);
		isPlaying = false;
	};

	const play = () => {
		isPlaying = true;
		game = nextGeneration(game);
		setTimeout(() => {
			if (isPlaying) {
				play();
			}
		}, game.rules.speed);
	};

	const toggleCell = (x: number, y: number) => {
		game.grid[x][y] = !game.grid[x][y];
	};
</script>

<div class="flex justify-center p-8 text-center">
	<div class="mx-auto space-y-8">
		<h1 class="h1">Game of <span class="text-green-400">life</span> Simulator</h1>
		<button class="variant-filled btn" on:click={randomizeGrid}>random board</button>
		<button class="variant-filled btn" on:click={resetGrid}>reset grid</button>
		<button class="variant-filled btn" on:click={play}>play game</button>

		<div class="flex flex-col">
			<div>
				{#each game.grid as row, x}
					<div class="flex justify-center text-xs md:text-base">
						{#each row as cell, y}
							<button
								style="padding:0; margin:0; border:none; box-sizing: border-box; line-height: 1;"
								on:click={() => toggleCell(x, y)}
							>
								{#if cell}
									<div>🟩</div>
									<!-- <div>Ö</div> -->
								{:else}
									<div>⬛</div>
									<!-- <div>_</div> -->
								{/if}
							</button>
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<p>
			generation {game.generation}
		</p>
		<div class="grid grid-cols-2 gap-x-8 px-8">
			<RangeSlider
				name="range-slider for x-axis"
				bind:value={gridDetails.x}
				on:change={randomizeGrid}
				min={2}
				max={gridDetails.xMax}
				step={1}
			>
				<div class="">
					<div class="">x axis</div>
					<div class="text-xs">{gridDetails.x} / {gridDetails.xMax}</div>
				</div>
			</RangeSlider>
			<RangeSlider
				name="range-slider for y-axis"
				bind:value={gridDetails.y}
				on:change={randomizeGrid}
				min={2}
				max={gridDetails.yMax}
				step={1}
			>
				<div class="">
					<div class="">y axis</div>
					<div class="text-xs">{gridDetails.y} / {gridDetails.yMax}</div>
				</div>
			</RangeSlider>
		</div>
		<div class="grid grid-cols-3 gap-x-4 px-8">
			<RangeSlider
				name="range-slider"
				bind:value={gridDetails.x}
				on:change={randomizeGrid}
				min={1}
				max={ruleMaximums.underpopulation}
				step={1}
			>
				<div class="">
					<div class=""></div>
					<div class="text-xs"></div>
				</div>
			</RangeSlider>
			<RangeSlider
				name="range-slider"
				bind:value={gridDetails.x}
				on:change={randomizeGrid}
				min={1}
				max={ruleMaximums.overpopulation}
				step={1}
			>
				<div class="">
					<div class=""></div>
					<!-- <div class="text-xs">{gridDetails.x} / {gridDetails.max}</div> -->
				</div>
			</RangeSlider>
			<RangeSlider
				name="range-slider"
				bind:value={gridDetails.x}
				on:change={randomizeGrid}
				min={1}
				max={ruleMaximums.reproduction}
				step={1}
			>
				<div class="">
					<div class=""></div>
					<!-- <div class="text-xs">{gridDetails.x} / {gridDetails.max}</div> -->
				</div>
			</RangeSlider>
		</div>
	</div>
</div>
