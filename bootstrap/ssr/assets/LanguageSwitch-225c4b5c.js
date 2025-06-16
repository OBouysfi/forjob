import { computed, ref, onMounted, onUnmounted, mergeProps, useSSRContext } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import { n as notify } from "../ssr.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
const footerData = () => {
  const footerCenter = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-center")) || [];
  });
  const footerRight = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-right")) || [];
  });
  const footerLeft = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes("footer-left")) || [];
  });
  const year = computed(() => {
    return (/* @__PURE__ */ new Date()).getFullYear();
  });
  const socials = computed(() => {
    return usePage().props.primaryData["socials"];
  });
  const email = ref("");
  const subscribe = () => {
    if (email.value) {
      router.post(
        route("newsletter.subscribe"),
        { email: email.value },
        {
          preserveScroll: true,
          onSuccess: () => {
            email.value = "";
            notify.success("Subscribed successfully");
          }
        }
      );
    }
  };
  const NEWSLETTER_API = computed(() => usePage().props.newsletter_api);
  return {
    footerCenter,
    footerRight,
    footerLeft,
    year,
    socials,
    email,
    subscribe,
    NEWSLETTER_API
  };
};
const _sfc_main = {
  __name: "LanguageSwitch",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const selectContainer = ref(null);
    const outsideClick = (event) => {
      if (isOpen.value && !selectContainer.value.contains(event.target)) {
        isOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", outsideClick);
    });
    onUnmounted(() => {
      document.removeEventListener("click", outsideClick);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nice-select border", { open: isOpen.value }]
      }, _attrs))}><div class="current text-dark me-2">${ssrInterpolate(_ctx.$page.props.languages[_ctx.$page.props.locale])}</div><ul class="list"><!--[-->`);
      ssrRenderList(_ctx.$page.props.languages, (language, key) => {
        _push(`<li class="${ssrRenderClass([key === _ctx.$page.props.locale ? "selected focus" : "text-dark", "option"])}">${ssrInterpolate(_ctx.trans(language))}</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LanguageSwitch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  footerData as f
};
