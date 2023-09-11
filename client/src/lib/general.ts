export const queryString = {
  parse: () => ({}),
  stringify: (obj: object) => {
    let str = ''
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value) && value.length > 0) {
        str += `&${key}[]=`
        str += value.join(`&${key}[]=`)
      } else {
        str += `&${key}=${value}`
      }
    }

    if (str.length > 0) {
      str = encodeURI(str.replace('&', '?'))
    }
    return str
  },
}
