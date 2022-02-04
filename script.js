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
    // data = (await reponse.json()) as Array<Partial<Pays>>;
    // const regions = new Set();
    // let html = "";
    // data.forEach(pays => regions.add(pays.region ))
    // regions.forEach( region => html += `<option>${region}</option>` )
    // document.querySelector("select").innerHTML = html; 
    render(data);
}));
function render(data) {
    let html = "";
    data.forEach(item => {
        const posts = item.posts;
        const htmlPosts = posts.map(post => `<li>${post.title}</li>`);
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
