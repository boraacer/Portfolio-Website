<script lang="ts">


</script>

<main>

	<div class="Title">
		<a href="/">Bora Acer.</a>
	</div>

	<div class="Link-Groups">
		<div class="Link-Group1">
			<a href="status">Status.</a>
			<a href="projects">Projects.</a>
		</div>
		<div class="Link-Group2">
			<a href="contact">Contact.</a>
			<a href="about">About.</a>
		</div>
	</div>

	<div>
		<slot></slot>
	</div>
</main>

<style>
	.Title {
		display: flex;
		margin-top: 4rem;
		border: 2px solid #000;
		box-shadow: 15px 15px 0 0 rgba(0, 0, 0, 0.5);
		z-index: 10;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.Title a {
		font-family: JetBrainsMono, monospace;
		font-weight: bold;
		font-size: 2.5rem;
		padding: 2.5rem;

		color: #000;
		text-decoration: none;
	}
	.Title a:hover {
		color: #fff;
		transition: color 0.3s ease;
	}

	.Title:hover {
		background-color: #000;
		box-shadow: none;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 80rem;
		margin: 2rem auto;
		background-color: var(--primary-background-light);
		border: 2px solid var(--color-border-light);
		margin-bottom: 2rem;
		height: 93vh;
		box-shadow: 15px 15px 0 0 rgba(0, 0, 0, 0.5);
	}

	.Link-Group1 {
		margin-top: 2rem;
		position: relative;
		top: -7.5rem;
		right: 24rem;
	}

	.Link-Group2 {
		margin-top: 2rem;
		position: relative;
		top: -11.5rem;
		left: 24rem;
	}

	.Link-Groups a {
		padding: 0.5rem 1rem;
		margin-left: 1rem;
		border: 2px solid #000;
		background-color: #fff;
		color: #000;
		text-decoration: none;
		font-family: 'Courier New', Courier, monospace;
		font-size: xx-large;
		transition:
			color 0.3s ease,
			background-color 0.3s ease;
		box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.5);
		transition: box-shadow 0.3s ease;
	}

	.Link-Groups a:hover {
		background-color: #000;
		color: #fff;
		transition: color 0.3s ease background-color 0.3s ease;
		box-shadow: none;
		transition: box-shadow 0.3s ease;
	}
</style>
