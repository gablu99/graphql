const { query } = require('./db'); // Import the database query function

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];


const resolvers = {
    Query: {
        users: async () => {
            const usersQuery = 'SELECT * FROM users';
            const users = await query(usersQuery);
            return users;
        },
        posts: async () => {
            const postsQuery = 'SELECT * FROM posts';
            const posts = await query(postsQuery);
            return posts;
        },
        post: async (_, { id }) => {
            const postQuery = 'SELECT * FROM posts WHERE id = $1';
            const post = await query(postQuery, [id]);
            return post[0];
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            const insertUserQuery = 'INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *';
            const newUser = await query(insertUserQuery, [name, email]);
            return newUser[0];
        },
        createPost: async (_, { title, content, authorId }) => {
            const insertPostQuery = 'INSERT INTO posts(title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
            const newPost = await query(insertPostQuery, [title, content, authorId]);
            return newPost[0];
        },
        createComment: async (_, { content, authorId, postId }) => {
            const insertCommentQuery = 'INSERT INTO comments(content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *';
            const newComment = await query(insertCommentQuery, [content, authorId, postId]);
            return newComment[0];
        },
    },
    User: {
        posts: async (user) => {
            const userPostsQuery = 'SELECT * FROM posts WHERE author_id = $1';
            const userPosts = await query(userPostsQuery, [user.id]);
            return userPosts;
        },
    },
    Post: {
        author: async (post) => {
            const authorQuery = 'SELECT * FROM users WHERE id = $1';
            const author = await query(authorQuery, [post.author_id]);
            return author[0];
        },
        comments: async (post) => {
            const postCommentsQuery = 'SELECT * FROM comments WHERE post_id = $1';
            const comments = await query(postCommentsQuery, [post.id]);
            return comments;
        },
    },
    Comment: {
        author: async (comment) => {
            const authorQuery = 'SELECT * FROM users WHERE id = $1';
            const author = await query(authorQuery, [comment.author_id]);
            return author[0];
        },
        post: async (comment) => {
            const postQuery = 'SELECT * FROM posts WHERE id = $1';
            const post = await query(postQuery, [comment.post_id]);
            return post[0];
        },
    },
};

module.exports = resolvers;

module.exports = resolvers;