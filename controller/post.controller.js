import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: req.body.public_id,
        url: req.body.url,
      },
      owner: req.user._id,
    };
    const newPost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(newPost._id);
    await user.save();

    res.status(200).json({
      sucsess: true,
      post: newPost,
      message: "Post uploaded ",
    });
  } catch (error) {
    res.status(500).json({
      sucsess: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    if (index > -1) {
      user.posts.splice(index, 1);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
      loggedInUser.following.splice(indexFollowing, 1);
      userToFollow.followers.splice(indexFollowers, 1);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: false,
        message: "User Unfollowed",
      });
    }
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await userToFollow.save();

    res.status(201).json({
      success: true,
      message: "User Followed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getPostOFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(200).json({
        success: true,
      });
    }
    post.caption = req.body.caption;
    await post.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const addComment=async(req,res)=>{
  try {
    const post=await Post.findById(req.params.id)
    if (!post) {
      res.status(400),json({
        success:true,
        message:"Post not found"
      })

      
    }
    post.comment.push({
      user:req.user._id,
      comment:req.body.comment
    })
    post.save()
    res.status(200).json({
      success:true,
      message:"comment added"
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}
