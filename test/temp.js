module.exports = [
  'document',
  ['doctype'],
  ['html',
    ['head',
      ['meta', {'charset': 'utf-8'}],
      ['link',
        {
          'type':'text/css',
          'rel':'stylesheet',
          'href':'table.css'
        }
      ],
      function(data){
        return data.head;
      }
    ],
    ['body',
      function(data){
        return {
          entity:data.table, 
          flag:1
        };
      },
      function(data){
        return {
          entity:data.ul,
          flag:1
        };
      },
      [[],{},[]],
      [],
      {}
    ],
    [],
    [],
    {},
    {}
  ]
];