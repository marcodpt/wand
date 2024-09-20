import wand from '../index.js'

QUnit.test('route matching', assert => {
  const H = []
  const _ = () => {}
  wand({
    routes: {
      'api/random': _,
      'api/:tbl': _,
      'api/me': _,
      ':x/:y': _,
      '*': _ 
    },
    plugins: [({route, Params}) => H.push({route, ...Params})],
    runtime: change => {
      assert.deepEqual(H, [])

      change('')
      assert.deepEqual(H, [
        {route: '*'},
      ])

      change('api')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
      ])

      change('api/?v=34')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
      ])

      change('api/users')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
        {route: 'api/:tbl', tbl: 'users'},
      ])

      change('api/random')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
        {route: 'api/:tbl', tbl: 'users'},
        {route: 'api/random'},
      ])

      change('api/me?')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
        {route: 'api/:tbl', tbl: 'users'},
        {route: 'api/random'},
        {route: 'api/me'},
      ])

      change('app/test?x=dog')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
        {route: 'api/:tbl', tbl: 'users'},
        {route: 'api/random'},
        {route: 'api/me'},
        {route: ':x/:y', x: 'app', y: 'test'},
      ])

      change('app/test/me')
      assert.deepEqual(H, [
        {route: '*'},
        {route: '*'},
        {route: 'api/:tbl', tbl: ''},
        {route: 'api/:tbl', tbl: 'users'},
        {route: 'api/random'},
        {route: 'api/me'},
        {route: ':x/:y', x: 'app', y: 'test'},
        {route: '*'},
      ])
    }
  })
})
