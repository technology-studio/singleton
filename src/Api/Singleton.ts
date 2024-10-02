/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-03-14T10:03:51+01:00
 * @Copyright: Technology Studio
**/

const singletonMap: Record<string, unknown> = {}

export const withSingleton = <VALUE>(key: string, init: () => VALUE): { getValue: () => VALUE, setValue: (value: VALUE) => void } => ({
    getValue: () => {
      if (!(key in singletonMap)) {
        singletonMap[key] = init()
      }
      return singletonMap[key] as VALUE
    },
    setValue: (value: VALUE) => {
      singletonMap[key] = value
    },
  })
