(function( ns ) {

  function parseChildren(name, json) {
    const children = []
    children.connectionName = name

    for(const el of json) {
      const parsed = jsonToTree(el)
      children.push(parsed)
    }

    return children
  }

  function jsonToTree(json) {
    const props = []
    const children = []

    for(let prop of Object.getOwnPropertyNames(json)) {
      if(!json[prop]) {
        continue
      }

      const value = json[prop]
      if(Array.isArray(value) && value.length) {
        children.push(parseChildren(prop, value))
      } else {
        props.push( { key: prop, value } )
      }
    }
    return { props, children }
  }

  ns.jsonToTree = jsonToTree
}( window.treeBuilder = window.treeBuilder || {} ));