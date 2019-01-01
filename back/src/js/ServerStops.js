const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const StopDAO=require('./dao/StopDAO');
const config=require('./Config');
const Stops=require('./pojo/Stops');

router.get("/", async function(req, res){
  let user=req.decoded;
  let sd=new StopDAO();
  let result=await sd.find(user);
  if(result!=null){
    res.status(200).json(result.stops);
  }else{
    res.status(404).json({success:false, message:'No stops found for this user !'});
  }
});

router.put("/:id", async function(req, res){
  let user=req.decoded;
  let id=req.params.id;
  id=parseInt(id);
  let sd=new StopDAO();
  let result=await sd.find(user);
  if(result!=null){
    result.addStop(id);
    result=await sd.save(result);
    res.status(200).json(result.stops);
  }else{
    result=new Stops(user.id, [id]);
    result=await sd.save(result);
    res.status(200).json(result.stops);
  }
});

router.delete("/:id", async function(req, res){
  let user=req.decoded;
  let sd=new StopDAO();
  let result=await sd.find(user);
  if(result!=null){
    let id=req.params.id;
    id=parseInt(id);
    result.removeStop(id);
    result=await sd.save(result);
    res.status(200).json(result.stops);
  }else{
    res.status(404).json({success:false, message:'No stops found for this user !'});
  }
});

module.exports = router;
