
const API_URL = import.meta.env.API_URL

export async function getPostsCount(perPage:number){
    const res = await fetch(`${API_URL}/posts?&per_page=${perPage}`);
    if(!res.ok) throw new Error("Error counting total posts ") ;
    const totalPost =  parseInt(res.headers.get("x-wp-total") || "0");
    return totalPost;
}
export async function getPostsPerPage(page=1, perPage:number){
    const res = await fetch(`${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
    console.log(`${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`)
    if(!res.ok) return null; 

    const jsonResult = await res.json();
    return jsonResult;   
}

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
    const res = await fetch(`${API_URL}/posts?categories=${id}&_embed&per_page=30`);
    if (!res.ok) throw new Error("Error retrieving posts by category");

    const jsonResult = await res.json();   
    return jsonResult;
}
export async function getPostsByScope(id:number){
    const res = await fetch(`${API_URL}/posts?ambito=${id}&_embed&per_page=30`);
    if (!res.ok) throw new Error("Error retrieving posts by scopes");
    
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
    if (!res.ok) throw new Error("Error retrieving scopes");

    const jsonResult = await res.json();
    return jsonResult;
}

export async function getPageBySlug(slug:string){
    const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
    if (!res.ok) throw new Error("Error retrieving page");

    const jsonResult = await res.json();
    return jsonResult;
}
// export async function getPages(){
//     const res = await fetch(`${API_URL}/ambito`);
//     if (!res.ok) throw new Error("Error retrieving categories");

//     const jsonResult = await res.json();
//     return jsonResult;
// }

export async function getSearchPosts(query : string){
    const res = await fetch(`${API_URL}/posts?search=${query}&_embed`);
    if (!res.ok) throw new Error("Error retrieving posts by search");

    const jsonResult = await res.json();
    return jsonResult;
}