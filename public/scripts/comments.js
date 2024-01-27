const viewcomments = document.getElementById("viewcomments");

async function fetchComments() {
  const postID = viewcomments.dataset.postid;
  const response = await fetch(`/post-detail/comment/${postID}`);
  const responsedata = await response.json();
  console.log(responsedata);
}

viewcomments.addEventListener("click", fetchComments);
