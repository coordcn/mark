module.exports = [
  function(data){
    if(data && data.length){
      var ul = ['ul'];
      var len = data.length;
      for(var i = 0; i  < len; i++){
        var row = data[i];
        var li = ['li'];
        var a = ['a', {href:row.href}, row.text];
        li.push(a);
        ul.push(li);
      }
      
      return {entity:ul};
    }else{
      return '';
    }
  }
];