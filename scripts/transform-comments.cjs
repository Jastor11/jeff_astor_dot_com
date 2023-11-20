const oldCommentsData = require("../src/data/comments/old-commento-comments.json")
const fs = require("fs")

function transformComments() {
  const oldCommentsList = oldCommentsData.comments

  // add trailing slash to all comment URLs
  const newCommentsList = oldCommentsList.map((comment) => {
    const newComment = comment
    newComment.url = comment.url + "/"
    return newComment
  })

  // write new comments list to file
  const newCommentsData = {
    ...oldCommentsData,
    comments: newCommentsList,
  }
  fs.writeFileSync("../src/data/comments/commento-comments.json", JSON.stringify(newCommentsData))
}

transformComments()
