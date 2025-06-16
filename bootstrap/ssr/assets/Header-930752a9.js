import { ref, onMounted, resolveComponent, resolveDirective, withCtx, mergeProps, withDirectives, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./NavMenu-d37d2a65.js";
import { s as sharedComposable, h as homeApiService, _ as _sfc_main$1, a as _sfc_main$3 } from "../ssr.js";
import { useForm } from "@inertiajs/vue3";
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
    const { authUser, pickBy, getQueryParams } = sharedComposable();
    const request = getQueryParams();
    const categories = ref([]);
    const loading = ref(true);
    const searchType = ref("Jobs");
    const form = useForm({
      keyword: request.keyword ?? ""
    });
    onMounted(async () => {
      homeApiService.get("menuCategories").then((res) => {
        categories.value = res;
        loading.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_lazy = resolveDirective("lazy");
      _push(`<!--[--><header class="theme-main-menu sticky-menu"><div class="inner-content position-relative"><div class="top-header"><div class="d-flex align-items-center justify-content-between"><div class="logo order-lg-0">`);
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
      _push(`</div><form class="header-search position-relative d-none d-sm-block ms-lg-5 ms-md-3 order-lg-1"><img src="/assets/images/icon/icon_21.svg" alt="img" class="lazy-img icon"><input type="text"${ssrRenderAttr("value", unref(form).keyword)} placeholder="Search here..">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: searchType.value,
        "onUpdate:modelValue": ($event) => searchType.value = $event,
        options: ["Talents", "Jobs"]
      }, null, _parent));
      _push(`</form><div class="right-widget ms-xl-5 order-lg-3 ms-auto"><ul class="d-flex align-items-center style-none">`);
      if (!unref(authUser)) {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_Link, {
          class: "fw-500 login-btn-two",
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
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(authUser) && unref(authUser).role == "employer") {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_Link, {
          class: "fw-500 login-btn-two",
          href: _ctx.route("employer.jobs.create")
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
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="d-none d-md-block ms-4">`);
      if (!unref(authUser)) {
        _push(ssrRenderComponent(_component_Link, {
          class: "btn-five",
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
          _push(`<a${ssrRenderAttr("href", _ctx.route("admin.dashboard"))} class="btn-five">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
        } else if (unref(authUser).role == "user") {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("user.dashboard"),
            class: "btn-five"
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
            class: "btn-five"
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
      _push(`</li></ul></div><nav class="navbar navbar-expand-lg p0 ms-lg-auto order-lg-2 ms-3"><button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span></span></button><div class="navbar-collapse collapse" id="navbarNav"><ul class="navbar-nav"><li class="d-block d-lg-none"><div class="logo">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "d-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({
              alt: "logo",
              width: "100"
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, _ctx.$page.props.primaryData.deep_logo)))}${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("img", {
                alt: "logo",
                width: "100"
              }, null, 512), [
                [_directive_lazy, _ctx.$page.props.primaryData.deep_logo]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li class="d-sm-none xs-mb-20"><form class="header-search position-relative"><img src="/assets/images/icon/icon_21.svg" alt="img" class="lazy-img icon"><input type="text"${ssrRenderAttr("value", unref(form).keyword)} placeholder="Search here..">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: searchType.value,
        "onUpdate:modelValue": ($event) => searchType.value = $event,
        options: ["Talents", "Jobs"]
      }, null, _parent));
      _push(`</form></li><li class="nav-item dropdown d-lg-none"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">${ssrInterpolate(_ctx.trans("Browse Categories"))}</a><ul class="dropdown-menu">`);
      if (!loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(categories.value, (category, index) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("job-categories.show", category.slug),
            class: "dropdown-item"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(category.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(category.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<li class="p-5">${ssrInterpolate(_ctx.trans("Loading Categories"))}...</li>`);
      }
      _push(`</ul></li>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<li class="mt-5 d-md-none">`);
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
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/Three/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
