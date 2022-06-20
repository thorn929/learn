function vDom(node) {
  let nodeType = node.nodeType;
  let _vnode = null;

  if (nodeType === 1) {
    let props = node.attributes;
    console.log(props);
    let property = {};
    for (let i = 0; i < props.length; i++) {
      property[props[i].name] = props[i].nodeValue;
    }
    _vnode = new VNode({
      tagName: node.nodeName,
      props: property,
      type: nodeType,
    });
    let children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (children[i].nodeType === 1 || children[i].length > 1) {
        _vnode.appendChild(vDom(children[i]));
      }
    }
  } else if (nodeType === 3) {
    _vnode = new VNode({ type: nodeType, value: node.nodeValue.trim() });
  }
  return _vnode;
}

vDom();
