import wand from '../index.js'

QUnit.test('runtime', assert => {
  const done = assert.async()
  const H = []

  assert.deepEqual(H, [])
  const stop = wand({
    init: () => {H.push('init')},
    routes: {
      'a': ({url}) => {
        H.push('a (action): '+url)
        return ({url}) => {H.push('a (done): '+url)}
      },
      'b': ({url}) => {
        H.push('b (action): '+url)
        return ({url}) => {H.push('b (done): '+url)}
      }
    },
    plugins: [
      ({url}) => {H.push('p1: '+url)},
      ({url}) => {H.push('p2: '+url)}
    ],
    runtime: change => {
      assert.deepEqual(H, [
        'init'
      ])

      change('c')
      assert.deepEqual(H, [
        'init'
      ])

      change('a')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a'
      ])

      change('b')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b'
      ])

      change('c')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b'
      ])

      change('b')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b',
        'p1: b',
        'p2: b',
        'b (done): b',
        'b (action): b'
      ])

      change('a')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b',
        'p1: b',
        'p2: b',
        'b (done): b',
        'b (action): b',
        'p1: a',
        'p2: a',
        'b (done): a',
        'a (action): a'
      ])

      change('a')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b',
        'p1: b',
        'p2: b',
        'b (done): b',
        'b (action): b',
        'p1: a',
        'p2: a',
        'b (done): a',
        'a (action): a',
        'p1: a',
        'p2: a',
        'a (done): a',
        'a (action): a'
      ])

      change('c')
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a',
        'p1: b',
        'p2: b',
        'a (done): b',
        'b (action): b',
        'p1: b',
        'p2: b',
        'b (done): b',
        'b (action): b',
        'p1: a',
        'p2: a',
        'b (done): a',
        'a (action): a',
        'p1: a',
        'p2: a',
        'a (done): a',
        'a (action): a'
      ])

      setTimeout(() => {
        stop()
        assert.deepEqual(H, [
          'init',
          'p1: a',
          'p2: a',
          'a (action): a',
          'p1: b',
          'p2: b',
          'a (done): b',
          'b (action): b',
          'p1: b',
          'p2: b',
          'b (done): b',
          'b (action): b',
          'p1: a',
          'p2: a',
          'b (done): a',
          'a (action): a',
          'p1: a',
          'p2: a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('c')
        assert.deepEqual(H, [
          'init',
          'p1: a',
          'p2: a',
          'a (action): a',
          'p1: b',
          'p2: b',
          'a (done): b',
          'b (action): b',
          'p1: b',
          'p2: b',
          'b (done): b',
          'b (action): b',
          'p1: a',
          'p2: a',
          'b (done): a',
          'a (action): a',
          'p1: a',
          'p2: a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('b')
        assert.deepEqual(H, [
          'init',
          'p1: a',
          'p2: a',
          'a (action): a',
          'p1: b',
          'p2: b',
          'a (done): b',
          'b (action): b',
          'p1: b',
          'p2: b',
          'b (done): b',
          'b (action): b',
          'p1: a',
          'p2: a',
          'b (done): a',
          'a (action): a',
          'p1: a',
          'p2: a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('a')
        assert.deepEqual(H, [
          'init',
          'p1: a',
          'p2: a',
          'a (action): a',
          'p1: b',
          'p2: b',
          'a (done): b',
          'b (action): b',
          'p1: b',
          'p2: b',
          'b (done): b',
          'b (action): b',
          'p1: a',
          'p2: a',
          'b (done): a',
          'a (action): a',
          'p1: a',
          'p2: a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        done()
      })

      return ({url}) => {H.push('finish')}
    }
  })
})
