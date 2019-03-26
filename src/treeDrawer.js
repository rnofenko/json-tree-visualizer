(function( ns ) {
  const getLevelCode = (rowLevel, colLevel) => {
    const row = rowLevel % 2
    const col = colLevel % 2
    return `r${row}c${col}`
  }

  const buildProps = (props) => {
    let html = "<div class='props'>"
    for(let prop of props) {
      const { key, value } = prop
      let propHtml = "<div class='prop'>"
      propHtml += `<span class='key'>${key}</span>`
      propHtml += `<span class='value'>${value}</span>`
      propHtml += "</div>"

      html += propHtml
    }
    html += "</div>"
    return html
  }

  const createChildrenConnection = (list, rowLevel, colLevel) => {
    const { connectionName } = list
    if(!connectionName) {
      return ""
    }

    const levelCode = getLevelCode(rowLevel, colLevel)
    let html = "<div class='connection " + levelCode + "'>"
    html += `<span>${connectionName}</span>`
    html += "</div>"
    return html
  }

  const buildChildren = (list, rowLevel, colLevel) => {
    let html = "<div>"
    const conn = createChildrenConnection(list, rowLevel, colLevel)
    if(conn) {
      rowLevel++
      html += conn
    }

    html += "<div class='list'>"
    colLevel = 0
    for(let child of list) {
      html += buildNode(child, rowLevel, colLevel)
      colLevel++
    }

    html += "</div>"
    html += "</div>"
    return html
  }

  const buildListOfChildren = (children, rowLevel) => {
    let html = "<div class='list'>"
    let colLevel = 0
    for(let child of children) {
      html += buildChildren(child, rowLevel, colLevel)
      colLevel++
    }
    html += "</div>"
    return html
  }

  function buildNode(root, rowLevel, colLevel) {
    const levelCode = getLevelCode(rowLevel, colLevel) 
    let html = "<div class='node " + levelCode + "'>"
    html += buildProps(root.props)
    html += buildListOfChildren(root.children, rowLevel + 1)
    html += "</div>"
    return html
  }

  const draw = (root, docId) => {
    const html = buildNode(root, 0, 0)
    const el = document.getElementById(docId)
    el.innerHTML = html
  }

  ns.draw = draw
}( window.treeDrawer = window.treeDrawer || {} ));