<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	const textToType =
		'My name is Bora Acer.<br>I am an individual deeply invested in the fields of Computer Science and Engineering.';
	let currentIndex = 0;
	let typedOutput = ''; // New reactive variable

	onMount(() => {
		function typeText() {
			if (currentIndex < textToType.length) {
				if (textToType.substr(currentIndex, 4) === '<br>') {
					typedOutput += '<br>';
					currentIndex += 4;
				} else {
					typedOutput += textToType[currentIndex];
					currentIndex++;
				}
				setTimeout(typeText, 75);
			}
		}
		typeText();
	});

	let skills: string[] = [];
	const GITHUB_API_URL = 'https://api.github.com/repos';
	const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';
	const SKILLS_TXT_URL = `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/Content/skills.txt`;

	let skillIcons: { [key: string]: string } = {};

	async function getFolderContent(
		repoOwner: string,
		repoName: string,
		path: string
	): Promise<any[]> {
		const url = `${GITHUB_API_URL}/${repoOwner}/${repoName}/contents/${path}`;
		try {
			const response = await axios.get(url);
			if (response.status === 200) {
				const fileUrls: string[] = response.data
					.filter((item: any) => item.type === 'file')
					.map((file: any) => {
						return `${GITHUB_RAW_URL}/${repoOwner}/${repoName}/main/${file.path}`;
					});
				return fileUrls;
			} else {
				throw new Error(
					`Error fetching the folder content: ${response.status} - ${response.statusText}`
				);
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Error fetching the folder content: ${error.message}`);
			} else {
				throw error;
			}
		}
	}

	async function getSkillsList(): Promise<string[]> {
		try {
			const response = await axios.get(SKILLS_TXT_URL);
			if (response.status === 200) {
				return response.data.split('\n').filter(Boolean); // Split by newline and filter out empty strings
			} else {
				throw new Error(`Error fetching skills list: ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			throw error;
		}
	}

	(async () => {
		try {
			skills = await getSkillsList();

			const folderContent = await getFolderContent('tandpfun', 'skill-icons', 'icons');

			for (const fileUrl of folderContent) {
				let fileNameWithoutExtension =
					fileUrl.split('/').pop()?.split('.').slice(0, -1).join('.') || '';

				// Check if the filename ends with "-Dark"
				if (fileNameWithoutExtension.toLowerCase().endsWith('-dark')) {
					fileNameWithoutExtension = fileNameWithoutExtension.slice(0, -5);
				}

				// Only add to skillIcons if the skill is in the skills list
				if (skills.includes(fileNameWithoutExtension)) {
					skillIcons[fileNameWithoutExtension] = fileUrl;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	})();
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
		<div class="image-container">
			<img
				src="https://github-readme-stats.vercel.app/api/top-langs/?username=boraacer&size_weight=1&count_weight=1&theme=radical"
				alt="Bora Acer's Top Languages"
			/>
		</div>
		<div class="social-media-container">
			<a
				href="https://www.linkedin.com/in/bora-acer-0a7a72144/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-link"
			>
				<img
					class="social-media-icon"
					src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/LinkedIn.svg"
					alt="LinkedIn"
				/>
			</a>
			<a
				href="https://github.com/boraacer"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-link"
			>
				<img
					class="social-media-icon"
					src="https://github.com/tandpfun/skill-icons/raw/main/icons/Github-Dark.svg"
					alt="GitHub"
				/>
			</a>
			<a
				href="https://www.instagram.com/boracer26/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-link"
			>
				<img
					class="social-media-icon"
					src="https://github.com/tandpfun/skill-icons/raw/main/icons/Instagram.svg"
					alt="Instagram"
				/>
			</a>
		</div>
	</section>
	<section id="skills" class="slide-in">
		<h2>Skills</h2>
		<div class="skills-container">
			{#each Object.keys(skillIcons) as skill (skill)}
				<div class="tooltip-container">
					<img class="skill-icon" src={skillIcons[skill]} alt={skill} />
					<span class="tooltip">{skill}</span>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.skills-container {
		display: flex;
		flex-wrap: wrap; /* Allows icons to wrap to the next line if there are many of them */
		justify-content: center; /* Horizontally centers the icons */
		align-items: center; /* Vertically centers the icons */
		gap: 10px; /* Provides space between the icons */
	}

	.skill-icon {
		width: 100px; /* Adjust as needed */
		height: 100px; /* Adjust as needed */
	}

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

	.tooltip-container {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		bottom: 100%; /* Positioned just above the top of the icon */
		left: 50%; /* Centered horizontally relative to the icon */
		transform: translateX(-50%); /* Adjusts the tooltip's position to be truly centered */
		background-color: #555; /* Background color for the tooltip */
		color: white;
		padding: 5px 10px;
		border-radius: 5px;
		opacity: 0; /* Hidden by default */
		transition: opacity 0.3s;
		pointer-events: none; /* Makes sure the tooltip doesn't interfere with other interactions */
		z-index: 1; /* Ensures the tooltip is displayed above other elements */
	}

	.tooltip-container:hover .tooltip {
		opacity: 1; /* Display the tooltip when the container is hovered */
	}

	.social-media-container {
		display: flex;
		justify-content: right;
		gap: 20px; /* Spacing between icons */
	}

	.social-media-link {
		color: inherit;
		text-decoration: none;
	}

	.social-media-icon {
		width: 50px; /* Icon size */
		height: 50px;
		fill: #fff; /* Icon color */
		transition: fill 0.3s; /* Color transition for hover effect */
	}

	.social-media-link:hover .social-media-icon {
		fill: #0df2c9; /* Color when hovered */
	}
</style>
