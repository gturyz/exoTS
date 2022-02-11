var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let data;
document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
    const reponseUsers = yield fetch("https://jsonplaceholder.typicode.com/users");
    const reponsePosts = yield fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = yield reponsePosts.json();
    const users = yield reponseUsers.json();
    data = users.map(user => (Object.assign({ posts: posts.filter(post => (post.userId === user.id) && post) }, user)));
    console.log(data);
    render(data);
}));
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTitre = document.querySelector("input[name='titre']");
    const inputAuteur = document.querySelector("input[name='auteur']");
    const listeFiltreUser = data.filter(user => {
        const posts = user.posts;
        return user.name.toLowerCase().includes(inputAuteur.value.toLowerCase()) && posts.find(post => post.title.toLowerCase().includes(inputTitre.value.toLowerCase()));
    });
    render(listeFiltreUser);
});
function render(data) {
    let html = "";
    data.forEach(item => {
        const posts = item.posts;
        const htmlPosts = posts.map(post => `<li>${post.title}</li>`).join('');
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
