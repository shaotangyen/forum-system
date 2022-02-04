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

        for (let i = 0; i < postSeeds.length; i++) {
            const { _id, user } = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: user },
                {
                    $addToSet: {
                        thoughts: _id,
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
