  module.exports = (fn) =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next)
    }
  };
  
  




  
//   function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next)
//     }
// }
// try-catch block ku hataake apan wrap-async daalte apan wo error handling mei 