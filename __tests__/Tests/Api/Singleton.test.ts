/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2024-10-01T09:10:78+02:00
 * @Copyright: Technology Studio
 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSingletonFunction = <VALUE>() => (
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@txo-peer-dep/singleton') as unknown as { withSingleton: (key: string, init: () => VALUE) => {
    getValue: () => VALUE,
    setValue: (value: VALUE) => void,
  }, }
).withSingleton

describe('Api/Singleton', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should initialize and return the value using getValue', () => {
    const withSingleton = getSingletonFunction()
    const key = 'testKey'
    const init = jest.fn(() => 'initialValue')
    const singleton = withSingleton(key, init)

    expect(singleton.getValue()).toBe('initialValue')
    expect(init).toHaveBeenCalledTimes(1)
  })

  it('should return the same value on subsequent getValue calls', () => {
    const withSingleton = getSingletonFunction()
    const key = 'testKey'
    const init = jest.fn(() => 'initialValue')
    const singleton = withSingleton(key, init)

    expect(singleton.getValue()).toBe('initialValue')
    expect(singleton.getValue()).toBe('initialValue')
    expect(init).toHaveBeenCalledTimes(1)
  })

  it('should update the value using setValue', () => {
    const withSingleton = getSingletonFunction()
    const key = 'testKey'
    const init = jest.fn(() => 'initialValue')
    const singleton = withSingleton(key, init)

    singleton.setValue('newValue')
    expect(singleton.getValue()).toBe('newValue')
  })

  it('should not call init for getValue after setValue', () => {
    const withSingleton = getSingletonFunction()
    const key = 'testKey'
    const init = jest.fn(() => 'initialValue')
    const singleton = withSingleton(key, init)

    singleton.setValue('newValue')
    expect(singleton.getValue()).toBe('newValue')
    expect(init).toHaveBeenCalledTimes(0)
  })

  it('should handle multiple keys independently', () => {
    const withSingleton = getSingletonFunction()
    const key1 = 'testKey1'
    const key2 = 'testKey2'
    const init1 = jest.fn(() => 'initialValue1')
    const init2 = jest.fn(() => 'initialValue2')
    const singleton1 = withSingleton(key1, init1)
    const singleton2 = withSingleton(key2, init2)

    expect(singleton1.getValue()).toBe('initialValue1')
    expect(singleton2.getValue()).toBe('initialValue2')
    expect(init1).toHaveBeenCalledTimes(1)
    expect(init2).toHaveBeenCalledTimes(1)

    singleton1.setValue('newValue1')
    singleton2.setValue('newValue2')

    expect(singleton1.getValue()).toBe('newValue1')
    expect(singleton2.getValue()).toBe('newValue2')
  })
})
