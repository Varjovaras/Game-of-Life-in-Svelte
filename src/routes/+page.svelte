<script lang="ts">
	import { newGame, nextGeneration, newEmptyGame } from '$lib/gameOfLife/game';

	const dimensions = {
		x: 60,
		y: 40
	};

	$: game = newEmptyGame(dimensions.x, dimensions.y);

	const randomizeGrid = () => {
		game = newGame(dimensions.x, dimensions.y);
		play();
	};

	const play = () => {
		game = nextGeneration(game);
		setTimeout(play, 200);
	};
</script>

<div class="flex min-h-screen flex-col justify-center">
	<div class="container mx-auto space-y-8 overflow-auto p-8 text-center">
		<h1 class="h1">Game of <span class="text-green-400">life</span> Simulator</h1>
		<button class="variant-filled h2 btn" on:click={randomizeGrid}>play game</button>
		<div class="space-x-0 space-y-0">
			{#each game.grid as row}
				<div class="flex justify-center text-center">
					{#each row as cell}
						<div class="ali">
							{cell ? '🟩' : '🟫'}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
