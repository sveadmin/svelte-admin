import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loader } from '../store.svelte.js'
import type { 
  LoaderStore,
} from '../types.js'

const GRACE_PERIOD = 200 // from ../action/unregister-task.ts

afterEach(async () => {
  vi.useRealTimers()
})

beforeEach(async () => {
  vi.useFakeTimers()
})

describe('Test loader store', () => {
  it('Loader behaves as singleton', async () => {
    const store1: LoaderStore = loader

    store1.state = true

    const store2: LoaderStore = loader

    expect(store1.state).toBe(true)
    expect(store2.state).toBe(true)

    store1.state = false
    expect(store1.state).toBe(false)
    expect(store2.state).toBe(false)

    const task1 = store1.registerTask()
    expect(store1.state).toBe(true)
    expect(store2.state).toBe(true)

    store1.unregisterTask(task1)
    vi.advanceTimersByTime(GRACE_PERIOD + 10)
    expect(store1.state).toBe(false)
    expect(store2.state).toBe(false)

  })

  it('Only false when all tasks are unregistered', async () => {
    const store1 = loader

    const task1 = store1.registerTask()
    expect(store1.state).toBe(true)

    const task2 = store1.registerTask()
    expect(store1.state).toBe(true)

    store1.unregisterTask(task1)
    expect(store1.state).toBe(true)

    store1.unregisterTask(task2)
    vi.advanceTimersByTime(GRACE_PERIOD + 10)
    expect(store1.state).toBe(false)

  })
})