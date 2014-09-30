module.exports = [
  '',
  function(data){
    if(data && data.length){
      var len = data.length;
      var table = ['table', {'class':'table table-border'}];
      for(var i = 0; i < len; i++){
        var row = data[i];
        if(row && row.length){
          var tr = ['tr'];
          for(j = 0, l = row.length; j < l; j++){
            tr.push(['td', row[j]]);
          }
          table.push(tr);
        }
      }
    
      return {
        entity: table
      };
    }else{
      return '';
    }
  }
];