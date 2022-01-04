const newFormHandler = async (event) => {
    event.preventDefault();
    const post_id = event.target.getAttribute('data-id');
    const comment = {
        post_id: post_id,
        content: document.querySelector('#comment-content').value.trim()
      }
    console.log(comment)
    if (comment) {
        console.log('here');
        const response = await fetch(`/api/comment/new-comment`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            console.log('response is ok')
            document.location.replace(`/api/post/${post_id}`);
        } else {
            alert('Failed to create post');
        }
    }
  };
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);