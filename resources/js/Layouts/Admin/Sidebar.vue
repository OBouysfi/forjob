<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import trans from '@/Composables/transComposable'
import SimpleBar from 'simplebar'
import sharedComposable from '@/Composables/sharedComposable'
import { menuType, navMenuItems, updateActiveMenu, updateActiveSubMenu } from './menu'
const { authUser, logout } = sharedComposable()

onMounted(() => {
  updateActiveMenu(window.location.href)

  window.addEventListener('load', () => {
    const wrapper = document.querySelector('.wrapper')
    const sidebar = document.querySelector('.sidebar')
    const sidebarToggle = document.querySelector('.sidebar-toggle')
    const content = document.querySelector('.sidebar-content')
    const menuItems = document.querySelectorAll('.sidebar-menu')

    const init = () => {
      initMenuItems()
      initSidebarToggle()
      initWrapper()
      initOverlay()
      handleWindowResize()
      initSidebarHover()
      initScrollBar()
    }

    const initMenuItems = () => {
      if (menuItems.length) {
        menuItems.forEach((menuItem) => {
          const parent = menuItem.parentElement
          const submenu = parent.querySelector('.sidebar-submenu')
          const arrow = menuItem.querySelector('.sidebar-menu-arrow')

          if (submenu) {
            menuItem.addEventListener('click', (e) => {
              e.preventDefault()
              toggleHeight(submenu, submenu.scrollHeight)
              arrow.classList.toggle('rotate')
            })
          }

          if (submenu && menuItem.classList.contains('active')) {
            toggleHeight(submenu, submenu.scrollHeight)
            arrow.classList.toggle('rotate')
          }
        })
      }
    }

    const toggleHeight = (element, height) => {
      if (element.style.height === '0px' || element.style.height === '') {
        element.style.height = `${height}px`
      } else {
        element.style.height = '0px'
      }
    }

    const initSidebarToggle = () => {
      if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => toggleSidebar())
      }
    }

    const toggleSidebar = () => {
      const windowWidth = window.innerWidth

      if (windowWidth < 1024) {
        sidebar.classList.toggle('expanded')
        document.querySelector('.sidebar-overlay').classList.toggle('active')
      } else {
        sidebar.classList.toggle('collapsed')
        wrapper.classList.toggle('expanded')
      }
    }

    const initWrapper = () => {
      if (sidebar) {
        if (sidebar.classList.contains('collapsed')) {
          wrapper.classList.add('expanded')
        } else {
          wrapper.classList.remove('expanded')
        }
      }
    }

    const initOverlay = () => {
      const overlay = document.createElement('div')
      overlay.classList.add('sidebar-overlay')
      document.body.appendChild(overlay)

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('expanded')
        overlay.classList.remove('active')
      })
    }

    const handleWindowResize = () => {
      if (sidebar) {
        window.addEventListener('resize', () => {
          if (window.innerWidth < 1024) {
            sidebar.classList.remove('collapsed')
            wrapper.classList.remove('expanded')
          } else {
            sidebar.classList.remove('expanded')
          }
        })
      }
    }

    const initSidebarHover = () => {
      if (sidebar) {
        sidebar.addEventListener('mouseenter', () => {
          if (window.innerWidth > 1024) {
            sidebar.classList.add('hovered')
          }
        })

        sidebar.addEventListener('mouseleave', () => {
          if (window.innerWidth > 1024) {
            sidebar.classList.remove('hovered')
          }
        })
      }
    }

    const initScrollBar = () => {
      if (sidebar) {
        new SimpleBar(content)

        const activeMenu = document.querySelector('.sidebar-menu.active')
        const activeSubmenu = document.querySelector('.sidebar-submenu-item.active')
        if (activeSubmenu) {
          activeSubmenu.scrollIntoView({ block: 'center', behavior: 'smooth' })
        } else if (activeMenu) {
          activeMenu.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
      }
    }

    init()
  })
})

const page = usePage()
const authUserPermissions = page.props.permissions ?? []

const canAccess = ({ permission }) => {
  let isSuperAdmin = authUser.role == 'admin'
  return permission == undefined || isSuperAdmin || authUserPermissions.includes(permission)
}
</script>

<template>
  <aside class="sidebar">
    <a href="/">
      <div class="sidebar-header">
        <div class="sidebar-logo-icon">
          <img
            v-lazy="$page.props.primaryData.deep_logo"
            alt="logo"
            class="block h-[30px] dark:hidden"
          />
          <img
            v-lazy="$page.props.primaryData.logo"
            alt="logo"
            class="hidden h-[30px] dark:block"
          />
        </div>
      </div>
    </a>

    <!-- Sidebar Menu Starts -->
    <ul class="sidebar-content">
      <!-- dropdown menu item -->
      <template v-for="(menu, parentMenuKey) in navMenuItems" :key="parentMenuKey">
        <template v-if="canAccess(menu)">
          <!-- menu heading -->
          <div v-if="menu.type == menuType.heading" class="sidebar-menu-header">
            {{ trans(menu.text) }}
          </div>

          <!-- single menu item -->
          <li
            v-if="(menu.type == menuType.item || menu.type == undefined) && !menu.disable"
            @click="updateActiveMenu(menu.uri)"
          >
            <Link :href="menu.uri ?? '#'" class="sidebar-menu" :class="{ active: menu.is_active }">
              <span class="sidebar-menu-icon">
                <i :data-feather="menu.icon ?? 'home'"></i>
              </span>
              <span class="sidebar-menu-text">{{ trans(menu.text) }}</span>
            </Link>
          </li>

          <!-- dropdown menu -->
          <li v-if="menu.type == menuType.dropdown">
            <a href="javascript:void(0);" class="sidebar-menu" :class="{ active: menu.is_active }">
              <span class="sidebar-menu-icon">
                <i :data-feather="menu.icon ?? 'home'"></i>
              </span>
              <span class="sidebar-menu-text">{{ menu.text ?? '' }}</span>
              <span class="sidebar-menu-arrow">
                <i data-feather="chevron-right"></i>
              </span>
            </a>
            <ul class="sidebar-submenu">
              <template v-for="subItem in menu.subs" :key="subItem">
                <li v-if="canAccess(subItem)" @click="updateActiveMenu(subItem.uri ?? '/')">
                  <Link
                    :href="subItem.uri"
                    class="sidebar-submenu-item"
                    :class="{ active: subItem.is_active }"
                  >
                    {{ trans(subItem.text) }}
                  </Link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </template>

      <!-- single menu item -->
      <li>
        <button type="button" @click="logout" class="sidebar-menu">
          <span class="sidebar-menu-icon">
            <i data-feather="log-out"></i>
          </span>
          <span class="sidebar-menu-text">{{ trans('Logout') }}</span>
        </button>
      </li>
    </ul>
    <!-- Sidebar Menu Ends -->
  </aside>
</template>
