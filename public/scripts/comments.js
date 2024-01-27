const viewcomments = document.getElementById("viewcomments");
const comments = document.getElementById("comments");
function createCommentsList(comments) {
  const comentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article >
  <h2>${comment.comment}  </h2>
  <p>${comment.desc}  </p>
</article>`;
comentListElement.appendChild(commentElement);
  }
  return comentListElement;
}
async function fetchComments() {
  const postID = viewcomments.dataset.postid;
  const response = await fetch(`/post-detail/comment/${postID}`);
  const responsedata = await response.json();
  const comentsListElement=createCommentsList(responsedata);
  comments.innerHTML='';
  comments.appendChild(comentsListElement);
}

viewcomments.addEventListener("click", fetchComments);
