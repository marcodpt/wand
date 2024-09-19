import wand from '../index.js'

var index = 0
var Query = null
var query = null
wand({
  routes: {
    '*': state => {
      index++
      query = state.query
      Query = state.Query
    } 
  },
  runtime: change => {
    QUnit.test('query parser', assert => {
      assert.deepEqual(index, 0)
      assert.deepEqual(Query, null)
      assert.deepEqual(query, null)

      change('')
      assert.deepEqual(index, 1)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('?')
      assert.deepEqual(index, 2)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/route')
      assert.deepEqual(index, 3)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/route?')
      assert.deepEqual(index, 4)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/some/route')
      assert.deepEqual(index, 5)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/some/route?')
      assert.deepEqual(index, 6)
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('?a=3')
      assert.deepEqual(index, 7)
      assert.deepEqual(Query, {a: '3'})
      assert.deepEqual(query, 'a=3')

      change('?a=&b=false&c.d={}')
      assert.deepEqual(index, 8)
      assert.deepEqual(Query, {a: '', b: 'false', 'c.d': '{}'})
      assert.deepEqual(query, 'a=&b=false&c.d={}')

      change('?a')
      assert.deepEqual(index, 9)
      assert.deepEqual(Query, {a: ''})
      assert.deepEqual(query, 'a')

      change('?a=&b&c.d={}')
      assert.deepEqual(index, 10)
      assert.deepEqual(Query, {a: '', b: '', 'c.d': '{}'})
      assert.deepEqual(query, 'a=&b&c.d={}')

      change('?pet=dog&pet=cat')
      assert.deepEqual(index, 11)
      assert.deepEqual(Query, {pet: 'cat'})
      assert.deepEqual(query, 'pet=dog&pet=cat')

      change('?pet[]=dog')
      assert.deepEqual(index, 12)
      assert.deepEqual(Query, {pet: ['dog']})
      assert.deepEqual(query, 'pet[]=dog')

      change('?pet[]=dog&pet[]=cat')
      assert.deepEqual(index, 13)
      assert.deepEqual(Query, {pet: ['dog', 'cat']})
      assert.deepEqual(query, 'pet[]=dog&pet[]=cat')

      change('?pet=dog&pet[]=cat')
      assert.deepEqual(index, 14)
      assert.deepEqual(Query, {pet: ['cat']})
      assert.deepEqual(query, 'pet=dog&pet[]=cat')

      change('?pet[]=dog&pet=cat')
      assert.deepEqual(index, 15)
      assert.deepEqual(Query, {pet: 'cat'})
      assert.deepEqual(query, 'pet[]=dog&pet=cat')
    })
  }
})
