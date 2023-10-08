<script>
	let sections = ['About', 'Projects', 'Contact'];
</script>

<nav class="slide-in">
	{#each sections as section}
		<a href="#{section.toLowerCase()}">{section}</a>
	{/each}
</nav>



<style>
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
        padding: 1rem;
        max-width: 1000px; /* Set the width limit here */
        margin: 0 auto 2rem auto; /* Added space below the navbar */
        border-radius: 15px; /* Rounded edges */
        font-family: 'Orbitron', sans-serif; /* Using Orbitron font for the navbar */
        z-index: 10; /* Ensures the navbar is above other elements */
        position: relative;
    }

    a {
        color: #0df2c9; /* Neon cyan color */
        margin: 0 1rem;
        text-decoration: none;
        font-size: 1.2rem; /* Optionally, adjust font size for better readability */
        position: relative; /* Required for positioning ::after pseudo-element */
    }

    a::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px; /* Line height when not hovering */
        background-color: #0df2c9; /* Neon cyan color for the line */
        transform: scaleX(0); /* Initially hidden */
        transform-origin: 0 50%;
        transition: transform 0.3s ease-in-out; /* Add a transition effect */
    }

    a:hover {
        color: #ff2079; /* Neon pink color on hover */
        text-shadow: 0 0 1px #ff2079; /* Neon purple shadow on hover */
    }

    a:hover::after {
        transform: scaleX(1); /* Fully visible line on hover */
    }
</style>

