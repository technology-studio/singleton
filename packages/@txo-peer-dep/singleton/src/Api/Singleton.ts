/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-03-14T10:03:51+01:00
 * @Copyright: Technology Studio
**/

const singletonMap: Record<string, unknown> = {}

export const withSingleton = <VALUE>(key: string, init: () => VALUE): VALUE => {
  let value = singletonMap[key]
  if (!value) {
    value = init()
  }
  return value as VALUE
}
