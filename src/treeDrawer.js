(function( ns ) {
  const getLevelCode = (rowLevel, colLevel) => {
    const row = rowLevel % 2
    const col = colLevel % 2
    return `r${row}c${col}`
  }

  const isListCollapsed = (el) => {
    return el.innerHTML === '-'
  }

  const changeSign = (el) => {
    const newContent = isListCollapsed(el) ? '+' : '-'
    el.innerHTML = newContent
  }

  const findListFromControl = (control) => {
    const parent = control.parentNode
    return parent.querySelector('.list')
  }

  const setListVisibility = (list, isVisible) => {
    const className = 'not-visible'
    if(isVisible) {
      list.classList.remove(className)
    } else {
      list.classList.add(className)
    }
  }

  const collapseExpand = (ev) => {
    const { target } = ev
    changeSign(target)
    const isCollapsed = isListCollapsed(target)
    const list = findListFromControl(target)
    setListVisibility(list, isCollapsed)
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

  const buildChildren = (children, rowLevel) => {
    let html = "<div class='list not-visible'>"
    let colLevel = 0
    for(let child of children) {
      html += buildNode(child, rowLevel, colLevel)
      colLevel++
    }
    html += "</div>"
    return html
  }

  const buildControls = (childrenCount) => {
    if(!childrenCount) {
      return ""
    }
    const link = "<a class='control'>+</a>"
    return childrenCount + " " + link
  }

  function buildNode(root, rowLevel, colLevel) {
    const levelCode = getLevelCode(rowLevel, colLevel) 
    let html = "<div class='node " + levelCode + "'>"
    html += buildProps(root.props)
    html += buildControls(root.children.length)
    html += buildChildren(root.children, rowLevel + 1)
    html += "</div>"
    return html
  }

  const draw = (root, docId) => {
    const html = buildNode(root, 0, 0)
    const el = document.getElementById(docId)
    el.innerHTML = html

    const controls = document.getElementsByClassName('control')
    for (var i = 0; i < controls.length; i++) {
      controls[i].addEventListener('click', collapseExpand, false);
    }
  }

  ns.draw = draw
}( window.treeDrawer = window.treeDrawer || {} ));