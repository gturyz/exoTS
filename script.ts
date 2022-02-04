
let data: any;

document.addEventListener("DOMContentLoaded", async () => {
    const reponseUsers = await fetch("https://jsonplaceholder.typicode.com/users")
    const reponsePosts = await fetch("https://jsonplaceholder.typicode.com/posts")

    const posts: any[] = await reponsePosts.json()
    const users: any[] = await reponseUsers.json()

    data = users.map(user => ({
        posts: posts.filter(post => (post.userId === user.id) && post),
        ...user
    }))

    console.log(data)
    // data = (await reponse.json()) as Array<Partial<Pays>>;
    // const regions = new Set();
    // let html = "";
    // data.forEach(pays => regions.add(pays.region ))
    // regions.forEach( region => html += `<option>${region}</option>` )
    // document.querySelector("select").innerHTML = html; 

    render(data)
})

function render(data: any[]) {
    let html = "";
    data.forEach(item => {
        const posts: any[] = item.posts
        const htmlPosts = posts.map(post => `<li>${post.title}</li>`)
        html += `
        <article>
            <h2>${item.name}</h2>
            <p>${item.email}</p>
            <h3>Titre des articles rédigés :</h3>
            <ul>${htmlPosts}</ul>
        </article>
        `;
    });
    document.querySelector("main").innerHTML = html;
}