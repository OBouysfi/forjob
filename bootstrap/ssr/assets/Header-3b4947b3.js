import { resolveComponent, resolveDirective, mergeProps, withCtx, withDirectives, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./NavMenu-d37d2a65.js";
import { s as sharedComposable } from "../ssr.js";
import "@inertiajs/vue3";
import "simplebar";
import "toastify-js";
import "feather-icons";
import "@floating-ui/dom";
import "@fortawesome/fontawesome-free/js/all.js";
import "resize-observer-polyfill";
import "moment";
import "@vueform/multiselect";
import "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic";
import "mosha-vue-toastify";
import "vue3-apexcharts";
import "vuedraggable";
import "pinia";
import "axios";
import "vue3-emoji-picker";
import "swiper/vue";
import "swiper";
import "laravel-echo";
import "pusher-js";
import "vue3-lazyload";
const _sfc_main = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { authUser } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "theme-main-menu menu-overlay menu-style-two sticky-menu" }, _attrs))}><div class="inner-content position-relative"><div class="top-header"><div class="d-flex align-items-center justify-content-between"><div class="logo order-lg-0">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({ alt: "logo" }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", { alt: "logo" }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="right-widget ms-lg-0 order-lg-2 ms-auto"><ul class="d-flex align-items-center style-none"><li>`);
      if (!unref(authUser)) {
        _push(ssrRenderComponent(_component_Link, {
          class: "fw-500 login-btn-three tran3s",
          href: _ctx.route("login")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(authUser).role == "admin") {
          _push(`<a${ssrRenderAttr("href", _ctx.route("admin.dashboard"))} class="fw-500 login-btn-three tran3s">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
        } else if (unref(authUser).role == "user") {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("user.dashboard"),
            class: "fw-500 login-btn-three tran3s"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.trans("Dashboard"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.trans("Dashboard")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (unref(authUser).role == "employer") {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("employer.dashboard"),
            class: "fw-500 login-btn-three tran3s"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.trans("Dashboard"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.trans("Dashboard")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</li>`);
      if (unref(authUser) && unref(authUser).role == "employer") {
        _push(`<li class="d-none d-md-block ms-3">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("employer.jobs.create"),
          class: "btn-five"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Post Job"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Post Job")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else if (!unref(authUser)) {
        _push(`<li class="d-none d-md-block ms-3">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("register"),
          class: "btn-five"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div><nav class="navbar navbar-expand-lg p0 ms-lg-5 order-lg-1 ms-3"><button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span></span></button><div class="navbar-collapse collapse" id="navbarNav"><ul class="navbar-nav"><li class="d-block d-lg-none"><div class="logo">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "d-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({
              alt: "logo",
              width: "100"
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", {
                alt: "logo",
                width: "100"
              }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<li class="d-md-none mt-5">`);
      if (!unref(authUser)) {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "btn-five w-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "btn-five w-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.trans("Dashboard"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.trans("Dashboard")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</li></ul></div></nav></div></div></div></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Six/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
