const {
  Router
} = require('express');
const router = Router();

let result = {
  rootId: null,
  lastId: 0
}
let q = []

// Get Request

router.get('/', (req, res) => {
  let traverse = (id) => {
    if (result[id].children.length == 0) {
      return ({
        [result[id].data]: {}
      })
    } else {
      let resultinner = {}
      result[id].children.forEach(element => {
        let resultTrav = traverse(element)
        resultinner = {
          ...resultTrav,
          ...resultinner
        }
      })
      return ({
        [result[id].data]: resultinner
      })
    }
  }
if(result.rootId == null) {
  res.json({
    data: {},
    status : '200',
    message: 'please call Post API to insert the data'
    });
}
else{
  let finalResult = traverse(result.rootId)
  res.json({
  data: finalResult,
  status : '200'
  });
}
});

// Post Request

router.post('/', (req, res) => {
let a = {}
result = {
  rootId: null,
  lastId: 0
}
q = []
  let flag = 1
  a = req.body
  for(element in a) 
  {
    if(element == a[element])
    {
      flag = 2
    }
  }

  let hasdata = (val) => {
    while (q) {
      id = q.pop()
      if (result[id].data == val) {
        return id
      } else {
        if (result[id].children.length == 0) {
          return null
        } else {
          q.push(...result[id].children)
        }
      }
    }
  }

  const insert = (key, val) => {
    if (result.rootId == null) {
      result.rootId = 0
      result[result.lastId] = {
        data: val,
        children: [result.lastId + 1],
        childs: [result.lastId + 1]
      }
      result.lastId++
      result[result.lastId] = {
        data: key,
        children: [],
        childs:[]
      }
      result.lastId++
    } else {
      q.push(result.rootId)
      let resultDataval = hasdata(val)
      q.push(result.rootId)
      let resultDatakey = hasdata(key)
      if (resultDataval == null && resultDatakey == null) {
        result[result.lastId] = {
          data: val,
          children: [result.lastId + 1],
        childs: [result.lastId + 1]

        }
        result.lastId++
        result[result.lastId] = {
          data: key,
          children: [],
          childs: []
        }
        result.lastId++
      } else if (resultDataval == null && resultDatakey != null) {

        result[result.lastId] = {
          data: val,
          children: [resultDatakey],
          childs: [resultDatakey, ...result[resultDatakey].childs]
        }
        if (resultDatakey == result.rootId) {
          result.rootId = result.lastId
        }
        result.lastId++

      } else if (resultDataval != null && resultDatakey == null) {
        result[result.lastId] = {
          data: key,
          children: [],
          childs:[]
        }
        result[resultDataval].children.push(result.lastId)
        result[resultDataval].childs.push(result.lastId)
        result.lastId++
        if (resultDataval == result.rootId) {
          result.rootId = resultDataval
        }
      } else if(result[resultDatakey].childs.includes(resultDataval))
      {
        flag = 3
        return 
      }
      else
      {
        result[resultDataval].children.push(resultDatakey)
      }
    }
  }

  for (key in a) {
    const val = a[key];
    insert(key, val)

  }

  if (flag == 2) {
  res.json({status : '400', error : 'Supervisor name and employee name Cant be same'}) 
  }
  else if(flag == 3) {
    res.json({status : '400', error : 'Loop Found in the data'}) 
  }
  else {
  res.json({status : '200', message : 'Success'});
}
})

module.exports = router;
