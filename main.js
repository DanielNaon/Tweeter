const Tweeter = function(){
    let posts =[
        {
            text: "First post!",
            id: "p1",
            comments: [
                { id: "c1", text: "First comment on first post!" },
                { id: "c2", text: "Second comment on first post!!" },
                { id: "c3", text: "Third comment on first post!!!" }
            ]
        },
        {
            text: "Aw man, I wanted to be first",
            id: "p2",
            comments: [
                { id: "c4", text: "Don't wory second poster, you'll be first one day." },
                { id: "c5", text: "Yeah, believe in yourself!" },
                { id: "c6", text: "Haha second place what a joke." }
            ]
        }
    ]
    let postIdCounter =0
    let commentIdCounter = 0

    for (let post of posts) {
        commentIdCounter += post.comments.length
    }

    function getPosts(){
        return posts
    }

    function addPosts(text, id){
        let obj = {
            text: text,
            id: id,
            comments: []
        }
        posts.push(obj)
        console.log(posts)
        return obj
    }

    function removePost(postID){
            console.log(postID)
            for(let post in posts){
                    if(posts[post].id == postID){
                        posts.splice(post, 1)
                }
            }
            renderer.renderPosts(tweeter.getPosts())
        }
    
    function addComment(text, postID){
        console.log(text, postID)
            for (let post of posts) {
                if (postID == post.id){
                    commentIdCounter++
                    let obj = { id: "c"+commentIdCounter, text: text}
                    post.comments.push(obj)
                    console.log(post.comments)
                }
            }
            renderer.renderPosts(tweeter.getPosts())
        }
    
    function removeComment(postID, commentID){
        for(let post of posts){
            if(postID == post.id){
                for(let index in post.comments){
                    if(post.comments[index].id == commentID){
                        console.log(post.comments[index].id)
                        post.comments.splice(index, 1)
                    }
                }
            }
        }
        renderer.renderPosts(tweeter.getPosts())
    }

    
    return{
        getPosts: getPosts,
        addPost: addPosts,
        removePost: removePost,
        addComment: addComment,
        removeComment: removeComment
    }
}

const tweeter = Tweeter()
const renderer = Renderer()
renderer.renderPosts(tweeter.getPosts())
let arr = tweeter.getPosts()
tweeter.addComment("Dani check!", "p1")
renderer.renderPosts(tweeter.getPosts())
let idPost = 0

function post(){
    text = $("input").val()
    let posts = tweeter.getPosts()
    if(posts.length == 0){ // an empty array is truhty - so if its not an empty array aka falsy
        idPost++
        id =  "p"+ idPost
        tweeter.addPost(text, id)
        renderer.renderPosts(tweeter.getPosts())
    }else{
        let id = $("#posts").find(".post").last().data().id
        id = id.substring(1)
        id="p" +(parseInt(id, 10)+1)
        tweeter.addPost(text, id)
        renderer.renderPosts(tweeter.getPosts())
    }
}
//delete post
$("#container").on("click", ".delete", function(){
   let postID= $(this).closest(".post").data().id
   console.log(postID)
   tweeter.removePost(postID)
})
// add new comment
$("#container").on("click", ".comment", function(){
    console.log($(this))
    let post=$(this).closest(".post")
    console.log(post)
    let input = `<div class="commentSection"><input class="inputComment" type='text' placeholder='write your comment here'/><button class="add">Add!</button></div>`
    post.append(input)
    Comment(post)
    function Comment(post){
    $("#container").on("click",".add", function(){
        let text = $(post).find(".inputComment").val()
        console.log(text)
        let id = $(post).data().id
        console.log(post.data().id)
        if(id && text){
            tweeter.addComment(text, id)
            $(post).find(".inputComment").val('')
        }

    })
}})

// delete new comment
$("#container").on("click", ".delete-comment", function(){
    let postID = $(this).closest(".post").data().id
    let commentID =$(this).closest(".comments").data().id
    console.log(postID)
    console.log(commentID)
    tweeter.removeComment(postID, commentID)
})