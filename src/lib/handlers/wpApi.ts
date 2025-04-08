const API_URL = "https://api.amanecer.pe/wp-json/wp/v2" 

export async function getPosts(){
    const res = await fetch(`${API_URL}/posts?_embed&_=${new Date().getTime()}`);
    if(!res.ok) throw new Error("Error retrieving posts") ;
    const jsonResult = await res.json();
    return jsonResult;
}

export async function getPostBySlug(slug:string){
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
    if (!res.ok) throw new Error("Error retrieving post");
    const posts = await res.json();
    return posts.length ? posts[0] : null;
}

export async function getPostById(id:number){
    const res = await fetch(`${API_URL}/posts/${id}?_embed`);
    if (!res.ok) throw new Error("Error retrieving post");
    const jsonResult = await res.json();
    return jsonResult;
}
export async function getPostsByCategory(id:number){
    const res = await fetch(`${API_URL}/posts?categories=${id}&_embed`);
    if (!res.ok) throw new Error("Error retrieving posts by category");

    const jsonResult = await res.json();   
    return jsonResult;
}
export async function getPostsByScope(id:number){
    const res = await fetch(`${API_URL}/posts?ambito=${id}&_embed`);
    if (!res.ok) throw new Error("Error retrieving posts by category");
    
    const jsonResult = await res.json();  
    return jsonResult;
}
export async function getCategories(){
    const res = await fetch(`${API_URL}/categories?_embed`);
    if (!res.ok) throw new Error("Error retrieving categories");

    const jsonResult = await res.json();
    return jsonResult;
}
export async function getScopes(){
    const res = await fetch(`${API_URL}/ambito`);
    if (!res.ok) throw new Error("Error retrieving categories");

    const jsonResult = await res.json();
    return jsonResult;
}