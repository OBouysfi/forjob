import { resolveComponent, resolveDirective, mergeProps, withCtx, withDirectives, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { s as sharedComposable } from "../ssr.js";
import { f as footerData, _ as _sfc_main$1 } from "./LanguageSwitch-225c4b5c.js";
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
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { footerCenter, footerRight, footerLeft, year, socials, email, NEWSLETTER_API, subscribe } = footerData();
    const { authUser, logout } = sharedComposable();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer-one" }, _attrs))}><div class="container"><div class="inner-wrapper"><div class="row justify-content-between"><div class="col-lg-2 col-md-3 footer-intro mb-15"><div class="logo mb-15">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({ alt: "logo" }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", { alt: "logo" }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.deep_logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><img src="/assets/images/shape/shape_28.svg" alt="shape" class="lazy-img mt-50 sm-mt-30 sm-mb-20"></div><div class="col-lg-2 col-md-3 col-sm-4 mb-20"><h5 class="footer-title">${ssrInterpolate(((_a = unref(footerLeft)) == null ? void 0 : _a.name) ? unref(footerLeft).name : _ctx.trans("Services​"))}</h5>`);
      if (unref(footerLeft) && ((_b = unref(footerLeft)) == null ? void 0 : _b.data)) {
        _push(`<ul class="footer-nav-link style-none"><!--[-->`);
        ssrRenderList(JSON.parse((_c = unref(footerLeft)) == null ? void 0 : _c.data), (item) => {
          _push(`<li>`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target
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
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-lg-2 col-md-3 col-sm-4 mb-20"><h5 class="footer-title">${ssrInterpolate(((_d = unref(footerCenter)) == null ? void 0 : _d.name) ? unref(footerCenter).name : "Company")}</h5>`);
      if (unref(footerCenter) && ((_e = unref(footerCenter)) == null ? void 0 : _e.data)) {
        _push(`<ul class="footer-nav-link style-none"><!--[-->`);
        ssrRenderList(JSON.parse((_f = unref(footerCenter)) == null ? void 0 : _f.data), (item) => {
          _push(`<li>`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target
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
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><li>`);
        if (!unref(authUser)) {
          _push(ssrRenderComponent(_component_Link, {
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
          _push(`<!---->`);
        }
        _push(`</li><li>`);
        if (!unref(authUser)) {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("register")
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
          _push(`<!---->`);
        }
        _push(`</li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-lg-2 col-md-3 col-sm-4 mb-20"><h5 class="footer-title">${ssrInterpolate(((_g = unref(footerRight)) == null ? void 0 : _g.name) ? unref(footerRight).name : "Support")}</h5>`);
      if (unref(footerRight) && ((_h = unref(footerRight)) == null ? void 0 : _h.data)) {
        _push(`<ul class="footer-nav-link style-none"><!--[-->`);
        ssrRenderList(JSON.parse((_i = unref(footerRight)) == null ? void 0 : _i.data), (item) => {
          _push(`<li>`);
          if (item.href) {
            _push(ssrRenderComponent(_component_Link, {
              href: item.href,
              target: item.target
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
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(NEWSLETTER_API) || ((_j = Object.entries(_ctx.$page.props.languages)) == null ? void 0 : _j.length) > 1) {
        _push(`<div class="col-lg-4 footer-newsletter mb-20">`);
        if (unref(NEWSLETTER_API)) {
          _push(`<!--[--><h5 class="footer-title">${ssrInterpolate(_ctx.trans("Newsletter"))}</h5><p>${ssrInterpolate(_ctx.trans("Join & get important new regularly"))}</p><form class="d-flex"><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="Enter your email*"><button type="submit">${ssrInterpolate(_ctx.trans("Send"))}</button></form><p class="note">${ssrInterpolate(_ctx.trans("We only send interesting and relevant emails."))}</p><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_k = Object.entries(_ctx.$page.props.languages)) == null ? void 0 : _k.length) > 1) {
          _push(`<!--[--><h4 class="footer-title fs-6 mb-2 mt-2">${ssrInterpolate(_ctx.trans("Language"))}</h4>`);
          _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bottom-footer"><div class="container"><div class="row align-items-center"><div class="col-lg-4 order-lg-3 mb-15"><ul class="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon"><!--[-->`);
      ssrRenderList(unref(socials), (social, key) => {
        _push(`<li${ssrRenderAttr("href", social)}><a${ssrRenderAttr("href", social)} target="_blank"><i class="${ssrRenderClass([`bi-${key}`, "bi"])}"></i></a></li>`);
      });
      _push(`<!--]--></ul></div><div class="col-lg-4 order-lg-1 mb-15"><ul class="d-flex style-none bottom-nav justify-content-center justify-content-lg-start"><li>`);
      _push(ssrRenderComponent(_component_Link, { href: "/page/privacy-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Privacy policy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Privacy policy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_Link, { href: "/page/terms-and-conditions" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Terms"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Terms")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_Link, { href: "/contact-us" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="col-lg-4 order-lg-2"><p class="mb-15 text-center">${ssrInterpolate(_ctx.trans("Copyright"))} @${ssrInterpolate(unref(year))} ${ssrInterpolate(_ctx.$page.props.app_name || "")}. </p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/One/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
