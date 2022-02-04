const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
// const commentSeeds = require('./commentSeeds.json');

db.once('open', async () => {
    try {
        // await Forum.deleteMany({});
        // await Comment.deleteMany({});
        await User.deleteMany({});
        await Post.deleteMany({});

        //add users
        await User.create(userSeeds);

        //add posts including comments
        console.log("postSeeds.length: " + postSeeds.length);
        for (let i = 0; i < postSeeds.length; i++) {
            // const { _id, user, comments } = await Post.create(postSeeds[i]);
            const newPost = await Post.create(postSeeds[i]);
            // console.log(user);
            // console.log(comments);
            //  console.log(newPost);
            await User.findOneAndUpdate(
                { username: newPost.user },
                {
                    $addToSet: {
                        posts: newPost._id,
                    },
                }
            );
            for (let j = 0; j < newPost.comments.length; j++) {
                console.log("comment content: " + newPost.comments[j].content);
                console.log("comment user: " + newPost.comments[j].user);
                await User.findOneAndUpdate(
                    { username: newPost.comments[j].user },
                    {
                        $addToSet: {
                            comments: newPost.comments[j]._id,
                        },
                    }
                );
            }
            // await User.findOneAndUpdate(
            //     { username: user },
            //     {
            //         $addToSet: {
            //             posts: _id,
            //         },
            //     }
            // );

        }

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
