const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
    try {
        // await Forum.deleteMany({});
        // await Comment.deleteMany({});
        await User.deleteMany({});
        await Post.deleteMany({});

        await User.create(userSeeds);

        console.log("postSeeds.length: " + postSeeds.length);
        for (let i = 0; i < postSeeds.length; i++) {
            const { _id, user, content } = await Post.create(postSeeds[i]);
            console.log(_id);
            console.log(user);
            console.log(content);
            await User.findOneAndUpdate(
                { username: user },
                {
                    $addToSet: {
                        posts: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
