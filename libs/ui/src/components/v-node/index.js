import { h, markRaw } from 'vue';

const VNode = (props, context) => {
  return h(markRaw(props.vnode), context.attrs, context.slots);
};
VNode.props = { vnode: { type: Function, required: true } };

export default VNode;
