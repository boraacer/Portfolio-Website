<script>
	import { fade } from 'svelte/transition';
	export let project = null;
	export let closeModal = () => {};
</script>

<div class="modal" on:click={closeModal} transition:fade>
	<div class="modal-content" on:click={(e) => e.stopPropagation()}>
		<button on:click={closeModal} class="close-btn">X</button>
		{#if project}
			<h3>{project.name}</h3>
			<p>{project.content}</p>
			<img src={project.imageURL} alt={project.name} class="project-image" />
		{/if}
	</div>
</div>

<style>
	/* Modal Overlay */
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black for the modal background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	/* Modal Content Box */
	.modal-content {
		background-color: #1a1a1a; /* Dark shade for the modal content */
		padding: 20px;
		border-radius: 10px;
		max-width: 80%;
		position: relative;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
		width: 75rem; /* Set specific width for the modal */
		max-width: 95%; /* Ensure the modal doesn't overflow on small screens */
	}

	/* Close Button */
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		color: #e0e0e0; /* Light gray for the close button */
		transition: color 0.2s ease; /* Smooth color transition on hover */
	}

	.close-btn:hover {
		color: #ffffff; /* Slightly brighter on hover */
	}

	/* Modal Content Text */
	h3,
	p {
		color: #e0e0e0; /* Light gray for the text */
		margin: 0; /* Remove default margins for a cleaner look */
	}

	h3 {
		margin-bottom: 10px; /* Add some spacing between the title and content */
	}

	/* Project Image Inside the Modal */
	.project-image {
		max-width: 100%; /* Ensure the image doesn't overflow the modal */
		margin-top: 10px; /* Add some spacing above the image */
	}
</style>
