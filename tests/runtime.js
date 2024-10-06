import {wand} from '../index.js'

QUnit.test('runtime', assert => {
  const done = assert.async()
  const H = []

  assert.deepEqual(H, [])
  const stop = wand({
    init: () => {H.push('init')},
    routes: {
      'a': ({url}, ...args) => {
        assert.deepEqual(args, ['pi', 3.14])
        H.push('a (action): '+url)
        return ({url}) => {H.push('a (done): '+url)}
      },
      'b': ({url}, ...args) => {
        assert.deepEqual(args, [])
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

      assert.deepEqual(change('c'), undefined)
      assert.deepEqual(H, [
        'init'
      ])

      assert.deepEqual(typeof change('a', 'pi', 3.14), "function")
      assert.deepEqual(H, [
        'init',
        'p1: a',
        'p2: a',
        'a (action): a'
      ])

      assert.deepEqual(typeof change('b'), "function")
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

      assert.deepEqual(change('c'), undefined)
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

      assert.deepEqual(typeof change('b'), "function")
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

      assert.deepEqual(typeof change('a', 'pi', 3.14), "function")
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

      assert.deepEqual(typeof change('a', 'pi', 3.14), "function")
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

      assert.deepEqual(change('c'), undefined)
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

        assert.deepEqual(change('c'), undefined)
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

        assert.deepEqual(change('b'), undefined)
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

        assert.deepEqual(change('a'), undefined)
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
