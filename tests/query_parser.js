import wand from '../index.js'

QUnit.test('query parser', assert => {
  var Query = null
  var query = null
  wand({
    routes: {
      '*': state => {
        query = state.query
        Query = state.Query
      } 
    },
    runtime: change => {
      assert.deepEqual(Query, null)
      assert.deepEqual(query, null)

      change('')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('?')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/route')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/route?')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/some/route')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('/some/route?')
      assert.deepEqual(Query, {})
      assert.deepEqual(query, '')

      change('?a=3')
      assert.deepEqual(Query, {a: '3'})
      assert.deepEqual(query, 'a=3')

      change('?a=&b=false&c.d={}')
      assert.deepEqual(Query, {a: '', b: 'false', 'c.d': '{}'})
      assert.deepEqual(query, 'a=&b=false&c.d={}')

      change('?a')
      assert.deepEqual(Query, {a: ''})
      assert.deepEqual(query, 'a')

      change('?a?b??&c?=x')
      assert.deepEqual(Query, {'a?b??': '', 'c?': 'x'})
      assert.deepEqual(query, 'a?b??&c?=x')

      change('?a=&b&c.d={}')
      assert.deepEqual(Query, {a: '', b: '', 'c.d': '{}'})
      assert.deepEqual(query, 'a=&b&c.d={}')

      change('?pet=dog&pet=cat')
      assert.deepEqual(Query, {pet: 'cat'})
      assert.deepEqual(query, 'pet=dog&pet=cat')

      change('?pet[]=dog')
      assert.deepEqual(Query, {pet: ['dog']})
      assert.deepEqual(query, 'pet[]=dog')

      change('?pet[]=dog&pet[]=cat')
      assert.deepEqual(Query, {pet: ['dog', 'cat']})
      assert.deepEqual(query, 'pet[]=dog&pet[]=cat')

      change('?pet=dog&pet[]=cat')
      assert.deepEqual(Query, {pet: ['cat']})
      assert.deepEqual(query, 'pet=dog&pet[]=cat')

      change('?pet[]=dog&pet=cat')
      assert.deepEqual(Query, {pet: 'cat'})
      assert.deepEqual(query, 'pet[]=dog&pet=cat')
    }
  })
})
