<script>
    let projects = [
        {name: 'Project 1', description: 'Description for Project 1'},
        {name: 'Project 2', description: 'Description for Project 2'},
        // ... add more projects as needed
    ];
</script>

<style>
    section {
        padding: 2rem 0;
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
