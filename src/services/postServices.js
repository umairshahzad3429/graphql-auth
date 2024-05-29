const { default: axios } = require("axios")


const fetchAllPostsbyUser = async(userId) => {
 
   const allPosts =  await axios.get('https://jsonplaceholder.typicode.com/')
    const postsByUser = allPosts.data.filter(post => parseInt(post.userId) === parseInt(userId))

    return postsByUser
} 

module.exports = {fetchAllPostsbyUser}