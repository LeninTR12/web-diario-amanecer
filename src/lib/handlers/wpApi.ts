const API_URL = "https://api.amanecer.pe/wp-json/wp/v2" 

export async function getPosts(){
    const res = await fetch(`${API_URL}/posts?_embed`);
    if(!res.ok) throw new Error("Error retrieving posts") ;
    return res.json();
}

export async function getPostBySlug(slug:string){
    const res = await fetch(`${API_URL}/posts?slug=${slug}&&_embed`);
    if (!res.ok) throw new Error("Error retrieving post");
    const posts = await res.json();
    return posts.length ? posts[0] : null;
}

export async function getPostById(id:number){
    const res = await fetch(`${API_URL}/posts/${id}?_embed`);
    if (!res.ok) throw new Error("Error retrieving post");
    return res.json();
}
export async function getCategories(){
    const res = await fetch(`${API_URL}/categories?_embed`);
    if (!res.ok) throw new Error("Error retrieving categories");
    return res.json();
}