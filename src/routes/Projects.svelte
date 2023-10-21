<script lang="ts">
	import axios from 'axios';

	type Project = {
		name: string;
		content: string;
		technologies: string;
		imageURL: string;
	};

	let projects: Project[] = [];

	const GITHUB_API_URL = 'https://api.github.com';
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

	async function getFolderContent(): Promise<any[]> {
		const url = `${GITHUB_API_URL}/repos/boraacer/Portfolio-Website/contents/Content/Projects`;

		try {
			const response = await axios.get(url);
			if (response.status === 200) {
				const fileUrls: string[] = response.data
					.filter((item: any) => item.type === 'file')
					.map((file: any) => {
						// Transform the URL to point to the raw content
						return `${GITHUB_RAW_URL}/boraacer/Portfolio-Website/main/${file.path}`;
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

		return {
			name: json.header || '',
			content: modifiedContent,
			technologies: json.technologies || '',
			imageURL: json.imageURL || ''
		};
	}

	(async () => {
		try {
			const folderContent = await getFolderContent();
			for (const file of folderContent) {
				const rawContent = await getFileContent(file);
				const parsedContent = await parseMarkdownContent(rawContent);

				projects = [...projects, parsedContent];
			}
			console.log(projects);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred:', error);
			}
		}
	})();
</script>

<section id="projects" class="slide-in">
	<h2>My Projects</h2>
	{#each projects as project}
		<div class="project">
			<h3>{project.name}</h3>
			<img src={project.imageURL} alt={project.name} />
			<h4>Technologies: {project.technologies}</h4>
			<p>{project.content}</p>
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
	.project {
		border: 1px solid #eee;
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 10px;
		max-width: 600px;
		margin: 0 auto;
		margin-bottom: 2rem; /* Add margin at the bottom to create space between divs */
	}
</style>
