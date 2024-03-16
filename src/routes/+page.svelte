<script lang="ts">
	import { newGame, nextGeneration } from '$lib/gameOfLife/game';
	import type { Game } from '$lib/gameOfLife/types';

	let game: Game = newGame();

	const calculate = () => {
		game = nextGeneration(game);
	};
</script>

<div class="flex min-h-screen justify-center">
	<div class="container mx-auto space-y-8 p-8 text-center">
		<h1 class="h1">Hello Skeleton</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing alimesami.</p>
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
		<button on:click={calculate}>next generation ()</button>
	</div>
</div>
