const updatePost = async (event) => {
    event.preventDefault();
    console.log('herererwtrew')
    console.log(event)
    const postId = event.target.getAttribute('data-id');
    console.log(postId)
    const postTitle = document.querySelector("#post-title").value.trim();
    const postContent = document.querySelector("#post-content").value.trim();
    console.log('akghfksjdghskjghs')
       
    if (postTitle || postContent) 
        {
            console.log('ready to update')
            const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                    id: postId, 
                    title: postTitle,
                    content: postContent,               
                }),
            headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to delete post');
            }
        };    

}
;

document
    .querySelector('.update-post-form')
    .addEventListener('submit', updatePost);