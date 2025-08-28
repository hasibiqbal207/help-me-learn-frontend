// Get all posts from search result
export const getPostSearchResult = state => state.post?.data || [];

// Get a specific post
export const getPost = state => state.post?.selectedPost || null;

// Get loading state
export const getPostLoading = state => state.post?.loading || false;

// Get error state
export const getPostError = state => state.post?.error || null; 