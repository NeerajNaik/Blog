const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    console.log(req.body)
    if (req.body.password) {
      var user = await User.findById(req.body.userId)
      // const salt = await bcrypt.genSalt(10);
      // var pass = await bcrypt.hash(req.body.password, salt);
      var verified = bcrypt.compareSync(req.body.password, user.password);
    }
    try {
      if(verified){
        
        if(req.body.username!==""){
          await Post.updateMany({ username: user.username },{"$set":{username:req.body.username}});
          var {password,...others} = req.body
        }else{
          var {password,username,...others} = req.body
        }
        
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: others,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
      }
      else{
        res.status(500).json("Wrong password")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;