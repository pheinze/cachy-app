import { h as head, a as attr } from './index2-dl7Q2-9_.js';
import './0-D2BpazDu.js';
import './index-CqD0WFBk.js';
import './context-R2425nfV.js';
import './constants-CBgeUOhQ.js';

const favicon = "/_app/immutable/assets/favicon.UJTxm55y.svg";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data } = $$props;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="icon"${attr("href", favicon)}/>`);
    });
    $$renderer2.push(`<div class="px-4">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-FifEVOs5.js.map
