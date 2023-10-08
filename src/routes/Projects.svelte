<script>
    let projects = [
        {name: 'Project 1', description: 'Description for Project 1'},
        {name: 'Project 2', description: 'Description for Project 2'},
        // ... add more projects as needed
    ];
</script>

<style>
    section {
        background-color: rgba(0, 0, 0, 0.7);
        border: 2px solid #0df2c9; /* Neon cyan border */
        padding: 2rem;
        margin-bottom: 1rem;
    }
    h2 {
        color: #ff2079; /* Neon pink for headings */
    }
    .project {
        border: 1px solid #eee;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>

<section id="projects"  class="slide-in">
    <h2>My Projects</h2>
    {#each projects as project}
        <div class="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    {/each}
</section>
