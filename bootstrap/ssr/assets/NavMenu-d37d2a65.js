import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "NestedNavMenu",
  __ssrInlineRender: true,
  props: {
    children: {
      type: [Array, Object]
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "dropdown-menu" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.children, (child) => {
        var _a, _b;
        _push(`<li class="${ssrRenderClass({ dropdown: ((_a = child.children) == null ? void 0 : _a.length) > 0 })}">`);
        if (child.target == "_top") {
          _push(`<a class="dropdown-item"${ssrRenderAttr("href", child.href ?? "#")}>${ssrInterpolate(child.text)}</a>`);
        } else {
          _push(ssrRenderComponent(_component_Link, {
            class: "dropdown-item",
            href: child.href ?? "#",
            target: child.target
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(child.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(child.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (((_b = child.children) == null ? void 0 : _b.length) > 0) {
          _push(ssrRenderComponent(_sfc_main$1, {
            children: child.children
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Common/NestedNavMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "NavMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const mainMenu = computed(() => {
      return usePage().props.menus.filter((item) => item.position === "main-menu") || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      ssrRenderList(mainMenu.value, (items) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(JSON.parse(items.data), (item) => {
          var _a, _b;
          _push(`<li class="${ssrRenderClass([{ "dropdown nested": ((_a = item.children) == null ? void 0 : _a.length) > 0 }, "nav-item"])}">`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target,
              class: "nav-link",
              role: "button"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_Link, {
              href: "#",
              class: "nav-link dropdown-toggle",
              role: "button",
              "data-bs-toggle": "dropdown",
              "data-bs-auto-close": "outside",
              "aria-expanded": "false"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          if (((_b = item.children) == null ? void 0 : _b.length) > 0) {
            _push(ssrRenderComponent(_sfc_main$1, {
              children: item.children
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Common/NavMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
