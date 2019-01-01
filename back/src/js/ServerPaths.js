const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const PathDAO=require('./dao/PathDAO');
const config=require('./Config');
const Paths=require('./pojo/Paths');

router.get("/", async function(req, res){
  let user=req.decoded;
  let sd=new PathDAO();
  let result=await sd.find(user);
  if(result!=null){
    res.status(200).json(result.paths);
  }else{
    res.status(404).json({success:false, message:'No paths found for this user !'});
  }
});

router.put("/", async function(req, res){
  let user=req.decoded;
  let path=req.body.path;
  let sd=new PathDAO();
  let result=await sd.find(user);
  if(result!=null){
    result.addPath(path);
    result=await sd.save(result);
    res.status(200).json(result.paths);
  }else{
    result=new Paths(user.id, [path]);
    result=await sd.save(result);
    res.status(200).json(result.paths);
  }
});

router.delete("/", async function(req, res){
  let user=req.decoded;
  let sd=new PathDAO();
  let result=await sd.find(user);
  if(result!=null){
    let path=req.body.path;
    result.removePath(path);
    result=await sd.save(result);
    res.status(200).json(result.paths);
  }else{
    res.status(404).json({success:false, message:'No paths found for this user !'});
  }
});

module.exports = router;
