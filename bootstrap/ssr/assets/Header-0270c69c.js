import { ref, onMounted, resolveDirective, mergeProps, unref, withCtx, withDirectives, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./NavMenu-d37d2a65.js";
import { s as sharedComposable, h as homeApiService } from "../ssr.js";
import { Link } from "@inertiajs/vue3";
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
    const categories = ref([]);
    const loading = ref(true);
    onMounted(async () => {
      homeApiService.get("homeMenuServices").then((res) => {
        categories.value = res;
        loading.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_lazy = resolveDirective("lazy");
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "theme-main-menu menu-overlay menu-style-one sticky-menu" }, _attrs))}><div class="inner-content position-relative"><div class="top-header"><div class="d-flex align-items-center"><div class="logo order-lg-0">`);
      _push(ssrRenderComponent(unref(Link), {
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
      _push(`</div><div class="right-widget order-lg-3 ms-auto"><ul class="d-flex align-items-center style-none">`);
      if (!unref(authUser)) {
        _push(`<li class="d-none d-md-block">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "job-post-btn tran3s"
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
        _push(`<li class="d-none d-md-block"><a${ssrRenderAttr("href", _ctx.route("employer.jobs.create"))} class="job-post-btn tran3s">${ssrInterpolate(_ctx.trans("Post Job"))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(authUser)) {
        _push(`<li>`);
        if (unref(authUser).role == "admin") {
          _push(`<a${ssrRenderAttr("href", _ctx.route("admin.dashboard"))} class="login-btn-one">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
        } else if (unref(authUser).role == "user") {
          _push(`<a${ssrRenderAttr("href", _ctx.route("user.dashboard"))} class="login-btn-one">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
        } else if (unref(authUser).role == "employer") {
          _push(`<a${ssrRenderAttr("href", _ctx.route("employer.dashboard"))} class="login-btn-one">${ssrInterpolate(_ctx.trans("Dashboard"))}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      } else {
        _push(`<li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "login-btn-one"
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
        _push(`</li>`);
      }
      _push(`<li class="d-none d-md-block ms-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/candidates",
        class: "btn-one"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Hire Top Talents"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Hire Top Talents")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><nav class="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2 ms-3"><button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span></span></button><div class="navbar-collapse collapse" id="navbarNav"><ul class="navbar-nav align-items-lg-center"><li class="d-block d-lg-none"><div class="logo">`);
      _push(ssrRenderComponent(unref(Link), {
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
      _push(`</div></li><li class="nav-item dropdown category-btn mega-dropdown-sm">`);
      _push(ssrRenderComponent(unref(Link), {
        class: "nav-link dropdown-toggle",
        href: "#",
        role: "button",
        "data-bs-toggle": "dropdown",
        "data-bs-auto-close": "outside",
        "aria-expanded": "false"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-grid-fill"${_scopeId}></i> ${ssrInterpolate(_ctx.trans("Category"))}`);
          } else {
            return [
              createVNode("i", { class: "bi bi-grid-fill" }),
              createTextVNode(" " + toDisplayString(_ctx.trans("Category")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="dropdown-menu category-dropdown">`);
      if (!loading.value) {
        _push(`<!--[--><li class="row gx-0"><!--[-->`);
        ssrRenderList(categories.value, (category, index) => {
          _push(ssrRenderComponent(unref(Link), {
            key: index,
            href: _ctx.route("job-categories.show", category.slug),
            class: "p-3 m-0 item col-lg-6 d-flex align-items-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="icon d-flex align-items-center justify-content-center rounded-circle tran3s"${_scopeId}><img${ssrRenderAttr("src", category.preview)}${_scopeId}></div><div class="flex-fill ps-3"${_scopeId}><div class="fw-500 text-dark"${_scopeId}>${ssrInterpolate(category.title)}</div><div class="job-count"${_scopeId}>${ssrInterpolate(category.jobs_count)} ${ssrInterpolate(_ctx.trans("Jobs"))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "icon d-flex align-items-center justify-content-center rounded-circle tran3s" }, [
                    createVNode("img", {
                      src: category.preview
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex-fill ps-3" }, [
                    createVNode("div", { class: "fw-500 text-dark" }, toDisplayString(category.title), 1),
                    createVNode("div", { class: "job-count" }, toDisplayString(category.jobs_count) + " " + toDisplayString(_ctx.trans("Jobs")), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></li><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/jobs",
          class: "explore-all-btn d-flex align-items-center justify-content-between tran3s"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="fw-500"${_scopeId}>${ssrInterpolate(_ctx.trans("Explore all fields"))}</span><span class="icon"${_scopeId}><i class="bi bi-chevron-right"${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("span", { class: "fw-500" }, toDisplayString(_ctx.trans("Explore all fields")), 1),
                createVNode("span", { class: "icon" }, [
                  createVNode("i", { class: "bi bi-chevron-right" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--]-->`);
      } else {
        _push(`<p class="p-5">${ssrInterpolate(_ctx.trans("Loading Categories"))}...</p>`);
      }
      _push(`</ul></li>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<li class="d-md-none"><a${ssrRenderAttr("href", _ctx.route("employer.jobs.create"))} class="job-post-btn tran3s">${ssrInterpolate(_ctx.trans("Post Job"))}</a></li><li class="d-md-none">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("candidates.index"),
        class: "btn-one w-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.trans("Hire Top Talents"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.trans("Hire Top Talents")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></nav></div></div></div></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default/One/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
