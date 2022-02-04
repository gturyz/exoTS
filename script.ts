type Post = {
    title: string,
    userId: number
}
type User = {
    id: number,
    name: string,
    email: string,
    posts: Post[]
}

let data: User[];

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

    render(data)
})

document.querySelector("form").addEventListener("submit" , (e : Event) => {
    e.preventDefault()
    const inputTitre = document.querySelector("input[name='titre']") as HTMLInputElement
    const inputAuteur = document.querySelector("input[name='auteur']") as HTMLInputElement
    
    const listeFiltreUser = data.filter( user => {
        const posts: Post[] = user.posts
        return user.name.toLowerCase().includes(inputAuteur.value.toLowerCase()) && posts.find(post => post.title.toLowerCase().includes(inputTitre.value.toLowerCase()))
    })
    render(listeFiltreUser)
})

function render(data: User[]) {
    let html = "";
    data.forEach(item => {
        const posts: Post[] = item.posts
        const htmlPosts = posts.map(post => `<li>${post.title}</li>`).join('')
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