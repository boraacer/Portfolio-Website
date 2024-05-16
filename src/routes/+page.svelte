<script lang="ts">
	let myStats = {
		projects: 0,
		stars: 0,
		peopleReached: 0,
		contributions: 0
	};
</script>

<main>
	<div class="OpenSource">
		<h2>Open Source Developer & Engineer.</h2>
	</div>

	<div class="myStats">
		<div class="myStats__item">
			<h2>Projects</h2>
			<p>{myStats.projects}</p>
		</div>
		<div class="myStats__item">
			<h2>Stars</h2>
			<p>{myStats.stars}</p>
		</div>
		<div class="myStats__item">
			<h2>People Reached</h2>
			<p>{myStats.peopleReached}</p>
		</div>
		<div class="myStats__item">
			<h2>Contributions</h2>
			<p>{myStats.contributions}</p>
		</div>
	</div>
</main>

<style>
	.OpenSource {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		max-width: 20rem;
        margin-right: 4rem;
        top: -9rem;

	}
	.OpenSource h2 {
		color: #333;
		font-family: JetBrainsMono, monospace;
		font-weight: bold;
		font-size: 3rem;

		text-align: left;
	}

	.myStats {
		border: #333 2px solid;
		padding: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, auto);
		gap: 1rem;
        margin-left: 4rem;
	}

	.myStats .myStats__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border: #333 2px solid;
	}
    .myStats .myStats__item p {
        font-family: 'Courier New', Courier, monospace;
        font-size: 2rem;
        font-weight: bold;
        color: #333;
    }

    main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 2rem auto;
        margin-bottom: 2rem;
    }
</style>
