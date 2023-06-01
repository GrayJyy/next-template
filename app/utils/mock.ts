const mock = (url: string) => fetch(url).then(r => r.json())

export { mock }
