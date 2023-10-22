<script lang="ts">
	import axios from 'axios';
	import Modal from './Modal.svelte';

	let selectedProject: null = null;

	function openModal(project: any) {
		selectedProject = project;
	}

	function closeModal() {
		selectedProject = null;
	}

	type Project = {
		name: string;
		content: string;
		technologies: string;
		imageURL: string;
	};

	let projects: Project[] = [];

	let skillIcons: { [key: string]: string } = {}; // Dictionary to store the icons

	const GITHUB_API_URL = 'https://api.github.com/repos';
	const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';

	async function getFileContent(url: string): Promise<string> {
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Error fetching the raw file content: ${error.message}`);
			} else {
				throw error; // re-throw the error unchanged
			}
		}
	}

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
						// Transform the URL to point to the raw content
						return `${GITHUB_RAW_URL}/${repoOwner}/${repoName}/main/${file.path}`;
					});
				return fileUrls;
			} else {
				throw new Error(
					`Error fetching the folder content: ${response.status} - ${response.statusText}`
				);
			}
		} catch (error) {
			// Check if the error is an instance of Error
			if (error instanceof Error) {
				throw new Error(`Error fetching the folder content: ${error.message}`);
			} else {
				throw error; // re-throw the error unchanged
			}
		}
	}
	function parseMarkdownContent(content: string): Project {
		const jsonStart = content.indexOf('{');
		const jsonEnd = content.indexOf('}');
		const jsonData = content.substring(jsonStart, jsonEnd + 1);

		const json = JSON.parse(jsonData);

		const modifiedContent = content.substring(jsonEnd + 2).trim(); // Everything after the JSON data

		const baseURL = `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/Content/Projects/`;

		return {
			name: json.header || '',
			content: modifiedContent,
			technologies: json.technologies || '',
			imageURL: baseURL + json.imageURL // Adjust the image URL to point to the right location
		};
	}
	function getCleanTechName(techName: string): string {
		return techName.replace('-Light', '').replace('-Dark', '');
	}
	// For the skill-icons repository
	(async () => {
		try {
			const folderContent = await getFolderContent('tandpfun', 'skill-icons', 'icons');

			for (const fileUrl of folderContent) {
				const fileNameWithoutExtension =
					fileUrl.split('/').pop()?.split('.').slice(0, -1).join('.') || '';
				skillIcons[fileNameWithoutExtension] = fileUrl;
			}
			console.log(skillIcons);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	})();

	// For the Portfolio-Website repository
	(async () => {
		try {
			const folderContent = await getFolderContent(
				'boraacer',
				'Portfolio-Website',
				'Content/Projects'
			);
			for (const file of folderContent) {
				const rawContent = await getFileContent(file);
				const parsedContent = parseMarkdownContent(rawContent);

				projects = [...projects, parsedContent];
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	})();	(async () => {
		try {
			const folderContent = await getFolderContent(
				'boraacer',
				'Portfolio-Website',
				'Content/Projects'
			);
			for (const file of folderContent) {
				const rawContent = await getFileContent(file);
				const parsedContent = parseMarkdownContent(rawContent);

				projects = [...projects, parsedContent];
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	})();	(async () => {
		try {
			const folderContent = await getFolderContent(
				'boraacer',
				'Portfolio-Website',
				'Content/Projects'
			);
			for (const file of folderContent) {
				const rawContent = await getFileContent(file);
				const parsedContent = parseMarkdownContent(rawContent);

				projects = [...projects, parsedContent];
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

{#if selectedProject}
	<Modal project={selectedProject} {closeModal} />
{/if}

<section id="projects" class="slide-in">
	<h2>My Projects</h2>
	{#each projects as project}
		<div
			class="project"
			on:click={() => openModal(project)}
			on:keydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					openModal(project);
				}
			}}
			role="button"
			tabindex="0"
			aria-label="Open project details"
		>
			<div class="project-content">
				<h3>{project.name}</h3>
				<div class="technologies">
					{#each project.technologies.split(',').map((tech) => tech.trim()) as tech}
						{#if skillIcons[tech]}
							<div class="tech-wrapper">
								<img src={skillIcons[tech]} alt={tech} class="tech-icon" />
								<div class="tech-tooltip">
									<img src={skillIcons[tech]} alt={tech} class="tech-tooltip-icon" />
									<p>{getCleanTechName(tech)}</p>
									<!-- Use the function here -->
								</div>
							</div>
						{/if}
					{/each}
				</div>
				<p>{project.content}</p>
			</div>
			<img src={project.imageURL} alt={project.name} class="project-image" />
		</div>
	{/each}
</section>

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

	section > :not(.project) {
		margin: 10px;
		padding: 10px;
	}
	.project {
		position: relative; /* set position context for the absolutely positioned .technologies */
		/* Remove flex properties if they exist */
		border: 1px solid #eee;
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 10px;
		max-width: 600px;
		margin: 0 auto;
		margin-bottom: 2rem;
		overflow: hidden;
		height: 250px;
	}
	.project-content {
		flex-grow: 1;
		margin-right: 20px; /* space between the content and the image */
		z-index: 1; /* ensure content is above the image */
	}

	.project-image {
		position: absolute; /* absolute positioning */
		right: 0; /* stretch to the right border */
		top: 0; /* stretch to the top border */
		bottom: 0; /* stretch to the bottom border */
		width: auto;
		height: 100%;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.technologies {
		position: absolute;
		bottom: 10px; /* distance from the bottom of the .project div */
		left: 10px; /* distance from the left of the .project div */
		display: flex; /* display icons horizontally */
		gap: 10px; /* space between icons */
	}

	.tech-icon {
		width: 24px; /* adjust as needed */
		height: 24px; /* adjust as needed */
	}

	.tech-wrapper {
		position: relative;
	}

	.tech-tooltip {
		display: flex;
		align-items: center; /* vertically align items */
		gap: 5px; /* space between icon and text */
		position: absolute;
		top: 0%; /* adjust to center tooltip vertically relative to the icon */
		transform: translateY(-50%); /* vertically center tooltip */
		background-color: rgba(0, 0, 0, 0.9);
		color: white;
		padding: 5px 10px;
		border-radius: 10px;
		border: 1px solid #fff; /* added border */
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		z-index: 1000;
		left: 35px;
	}
	.tech-tooltip-icon {
		width: 48px; /* adjust as needed */
		height: 48px; /* adjust as needed */
	}

	.tech-wrapper:hover .tech-tooltip {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.tech-wrapper:hover .tech-tooltip {
			opacity: 0 !important; /* hide the tooltip */
			pointer-events: none; /* ensure it doesn't interfere with other elements */
		}
	}

	@media (max-width: 768px) {
		.project {
			position: relative;
			padding: 0; /* Remove padding to allow the image to cover the entire div */
		}

		.project-content {
			position: absolute; /* Position the content box above the image */
			top: 0;
			left: 0;
			width: 100%; /* Cover the entire width of the .project div */
			height: 100%; /* Cover the entire height of the .project div */
			background-color: rgba(0, 0, 0, 0.5); /* Translucent white background */
			padding: 1rem; /* Padding inside the content box */
			box-sizing: border-box; /* Include padding and border in width/height calculations */
			display: flex;
			flex-direction: column;
			justify-content: center; /* Center content vertically */
		}

		.project-image {
			position: absolute; /* Position the image to cover the entire .project div */
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover; /* Scale the image to cover the entire div */
			z-index: -1; /* Place the image behind the content */
		}

		.technologies {
			margin-top: 10px; /* Add some spacing between the content and the technologies */
		}
	}
</style>
