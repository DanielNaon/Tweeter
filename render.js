function Renderer(){
    function renderPosts(posts){
        $("#posts").empty()
        for(let post of posts){
            let newPost =
            `<div class="post" data-id="${post.id}">
                ${post.text}
                <button class="delete">Delete Post</button>
                <button class="comment">Add Comment</button>
            </div>`
            $("#posts").append(newPost)
            for(let comment of post.comments){
                let newComment = `<div class="comments" data-id="${comment.id}">${comment.text}<div class="delete-comment">delete<div></div>`
                $(`.post[data-id="${post.id}"]`).append(newComment)
            }
        }

    }
    return{
        renderPosts: renderPosts
    }
}
