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

  function parseNode(json) {
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

  function jsonToTree(json) {
    if(Array.isArray(json)) {
      return jsonToTree( { name: 'ROOT', forest: json } )
    }

    return parseNode(json)
  }

  ns.jsonToTree = jsonToTree
}( window.treeBuilder = window.treeBuilder || {} ));