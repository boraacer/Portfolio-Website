<script lang="ts">
	import { onMount } from 'svelte';

	const textToType =
		"My name is Bora Acer.<br>I am an individual deeply invested in the fields of Computer Science and Engineering.";
	let currentIndex = 0;
	let typedOutput = ''; // New reactive variable

	onMount(() => {
		function typeText() {
			if (currentIndex < textToType.length) {
				// If the current segment is '<br>', append the whole tag at once
				if (textToType.substr(currentIndex, 4) === '<br>') {
					typedOutput += '<br>';
					currentIndex += 4;
				} else {
					typedOutput += textToType[currentIndex];
					currentIndex++;
				}

				setTimeout(typeText, 75); // adjust the timeout for typing speed
			}
		}

		typeText();
	});
</script>

<div class="slide-in">
	<div class="cyberpunk-container">
		<div class="terminal">
			<div id="typed-output">
				{@html typedOutput}
                <span class="cursor" />
			</div>

			
		</div>
		<p />
	</div>

	<section id="home" class="slide-in">
		<h2>Home</h2>
		<img
			src="https://github-readme-stats.vercel.app/api/top-langs/?username=boraacer&size_weight=1&count_weight=1&theme=radical"
			alt="Bora Acer's Top Languages"
		/>
	</section>
</div>

<style>
section {
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid #0df2c9; /* Neon cyan border */
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 10px; 
	
}
	h2 {
		color: #ff2079; /* Neon pink for headings */
	}

	.cyberpunk-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(0, 0, 0, 0.8); /* Semi-transparent black to create a layered feel */
		border: 2px solid #0df2c9; /* Neon cyan border */
		box-shadow: 0 0 10px #0df2c9, /* Outer neon glow */ 0 0 20px #0df2c9, 0 0 30px #0df2c9,
			0 0 40px #0df2c9;
		padding: 2rem;
		margin-bottom: 4rem;
		border-radius: 15px;
	}

	.cyberpunk-container p {
		color: #ff46db; /* Neon pink text */
		text-align: center;
		font-family: Consolas, Monaco, 'Courier New', monospace;
		font-size: 1.5rem;
	}
    .terminal {
        background-color: #000;
        color: #0f0;
        padding: 10px;
        font-size: 1.2rem;
        font-family: 'Terminus', 'Courier New', monospace;
        overflow: hidden;
        white-space: pre-wrap; /* set the white-space property to pre-wrap */
        border-radius: 5px;
        position: relative;
    }

    .cursor {
        background-color: #0f0;
        animation: blink 1s infinite;
        width: 10px;
        height: 1em;
        display: inline-block;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        49% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
</style>
