import wand from '../index.js'

QUnit.test('runtime', assert => {
  const done = assert.async()
  const H = []
  const stop = wand({
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
    runtime: change => {
      assert.deepEqual(H, [])

      change('c')
      assert.deepEqual(H, [])

      change('a')
      assert.deepEqual(H, [
        'a (action): a'
      ])

      change('b')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b'
      ])

      change('c')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b'
      ])

      change('b')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b',
        'b (done): b',
        'b (action): b'
      ])

      change('a')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b',
        'b (done): b',
        'b (action): b',
        'b (done): a',
        'a (action): a'
      ])

      change('a')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b',
        'b (done): b',
        'b (action): b',
        'b (done): a',
        'a (action): a',
        'a (done): a',
        'a (action): a'
      ])

      change('c')
      assert.deepEqual(H, [
        'a (action): a',
        'a (done): b',
        'b (action): b',
        'b (done): b',
        'b (action): b',
        'b (done): a',
        'a (action): a',
        'a (done): a',
        'a (action): a'
      ])

      setTimeout(() => {
        stop()
        assert.deepEqual(H, [
          'a (action): a',
          'a (done): b',
          'b (action): b',
          'b (done): b',
          'b (action): b',
          'b (done): a',
          'a (action): a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('c')
        assert.deepEqual(H, [
          'a (action): a',
          'a (done): b',
          'b (action): b',
          'b (done): b',
          'b (action): b',
          'b (done): a',
          'a (action): a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('b')
        assert.deepEqual(H, [
          'a (action): a',
          'a (done): b',
          'b (action): b',
          'b (done): b',
          'b (action): b',
          'b (done): a',
          'a (action): a',
          'a (done): a',
          'a (action): a',
          'a (done): a',
          'finish'
        ])

        change('a')
        assert.deepEqual(H, [
          'a (action): a',
          'a (done): b',
          'b (action): b',
          'b (done): b',
          'b (action): b',
          'b (done): a',
          'a (action): a',
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
