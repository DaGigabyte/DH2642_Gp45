
# Fields in the model needed for homepage and detailedPost - Pontus
    currentPostId - the id of the post clicked on to view

    setCurrentPostId(id) - a function to update the currentPostId

    getCurrentPost() - a function that returns the post with the currentPostId === postId for the detailspresenter 
                    ( a seq search through newPosts and hotPosts is suffient enough for now I think)



    post : {postId, profilePicture, createdBy, posterPath, source, content} - the attributes needed for the posts

    hotPosts: [] - an array of posts (might wait with this until like function works)

    newPosts: [] - an array of posts sorted by date

    loadMorePost() - a function that loads another set of posts into newPosts (This can wait a little)