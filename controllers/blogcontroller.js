const Blog = require('../models/blog');

const blog_index = (req,res) => {
    //Retrieving Database Data and Sending to Index
    Blog.find().sort({createdAt:-1}) //Sorting Latest to Oldest
    .then((result) => {
        res.render('blogs/index' , {title : 'All Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_details = (req,res) => {
    Blog.findById(req.params.id)
    .then((result) => {
        res.render('blogs/details',{title: 'Blog Details',blog:result});
    })
    .catch((err) => {
        res.render('404',{title:'404'});
    });
}

const blog_create_get = (req,res) => {
    res.render('blogs/create',{title : 'Create'});
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_delete = (req,res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}