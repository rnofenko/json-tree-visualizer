(function( ns ) {

  function parseChildren(name, json, { skipCollectionName, wrapParent }) {
    const children = json.map(el => parseNode(el, { skipCollectionName }))

    if(!wrapParent) {
      return children
    }

    const props = [ { key: 'col', value: name } ]
    return { props, children }
  }

  function parseChildrenList (childrenProps, json, { skipCollectionName }) {
    if(skipCollectionName && childrenProps.length === 1) {
      const name = childrenProps[0]
      return parseChildren(name, json[name], { skipCollectionName, wrapParent: false })
    }
    return childrenProps.map(c => parseChildren(c, json[c], { skipCollectionName, wrapParent: true }))
  }

  function parseNode(json, { skipCollectionName }) {
    const props = []
    const childrenProps = []

    for(let prop of Object.getOwnPropertyNames(json)) {
      if(!json[prop]) {
        continue
      }

      const value = json[prop]
      if(Array.isArray(value) && value.length) {
        childrenProps.push(prop)
      } else {
        props.push( { key: prop, value } )
      }
    }

    const children = parseChildrenList(childrenProps, json, { skipCollectionName })

    return { props, children }
  }

  function jsonToTree(json, { skipCollectionName }) {
    if(Array.isArray(json)) {
      return jsonToTree( { name: 'ROOT', forest: json }, { skipCollectionName } )
    }

    return parseNode(json, { skipCollectionName })
  }

  ns.jsonToTree = jsonToTree
}( window.treeBuilder = window.treeBuilder || {} ));