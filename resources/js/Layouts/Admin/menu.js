export const menuType = {
  item: 'item',
  heading: 'heading',
  dropdown: 'dropdown'
}

export var navMenuItems = [
  {
    icon: 'home',
    text: 'Dashboard',
    uri: route('admin.dashboard')
  },
  {
    permission: 'order',
    icon: 'shopping-cart',
    text: 'Orders',
    uri: route('admin.order.index')
  },
  {
    permission: 'order',
    icon: 'credit-card',
    text: 'Credit Logs',
    uri: route('admin.credit-logs.index')
  },
  {
    permission: 'subscriptions',
    icon: 'user',
    text: 'Subscriptions',
    uri: route('admin.plan.index')
  },
  {
    permission: 'companies',
    icon: 'aperture',
    text: 'Companies',
    uri: route('admin.companies.index')
  },
  {
    permission: 'candidates',
    icon: 'user-check',
    text: 'Candidates',
    uri: route('admin.candidates.index')
  },
  {
    permission: 'company-reviews',
    icon: 'message-circle',
    text: 'Company Reviews',
    uri: route('admin.company-reviews.index')
  },
  {
    permission: 'candidate-reviews',
    icon: 'message-square',
    text: 'Candidate Reviews',
    uri: route('admin.candidate-reviews.index')
  },
  {
    permission: 'gateways',
    icon: 'calendar',
    text: 'Payment Gateways',
    uri: route('admin.gateways.index')
  },
  {
    permission: 'cron-job',
    icon: 'code',
    text: 'Cron Jobs',
    uri: '/admin/cron-job'
  },
  {
    permission: 'support',
    icon: 'message-square',
    text: 'Help & Support',
    uri: route('admin.support.index')
  },

  {
    type: menuType.heading,
    text: 'AI TEMPLATES'
  },
  {
    permission: 'description-templates',
    icon: 'box',
    text: 'Description Templates',
    uri: route('admin.description-templates.index')
  },

  {
    permission: 'ai-templates',
    icon: 'box',
    text: 'AI Templates',
    uri: route('admin.ai-templates.index')
  },
  {
    permission: 'ai-generated-history',
    icon: 'codepen',
    text: 'AI Generated History',
    uri: route('admin.ai-generated-history')
  },
  {
    permission: 'ai-language',
    icon: 'grid',
    text: 'Language',
    uri: route('admin.ai-language.index')
  },

  {
    type: menuType.heading,
    text: 'JOBS'
  },
  {
    icon: 'award',
    text: 'Jobs',
    uri: route('admin.job.index')
  },
  {
    type: menuType.dropdown,
    icon: 'columns',
    text: 'Job Categories',
    subs: [
      {
        permission: 'job-service',
        text: 'Services',
        uri: route('admin.job-service.index')
      },
      {
        permission: 'job-category',
        text: 'Categories',
        uri: route('admin.job-category.index')
      },
      {
        permission: 'job-tags',
        text: 'Skills',
        uri: route('admin.job-skills.index')
      }
    ]
  },
  {
    permission: 'qualifications',
    icon: 'book-open',
    text: 'Qualifications',
    uri: route('admin.qualifications.index')
  },
  {
    permission: 'expert-levels',
    icon: 'briefcase',
    text: 'Expert Level',
    uri: route('admin.expert-levels.index')
  },
  {
    type: menuType.heading,
    text: 'USER LOGS'
  },
  {
    permission: 'notification',
    icon: 'bell',
    text: 'Notifications',
    uri: route('admin.notification.index')
  },
  {
    permission: 'message-requests',
    icon: 'mail',
    text: 'Message Request',
    uri: route('admin.message.index')
  },
  {
    type: menuType.heading,
    text: 'APPEARANCE'
  },
  {
    type: menuType.dropdown,
    icon: 'book',
    text: 'Blogs',
    subs: [
      {
        permission: 'blogs',
        text: 'Blog',
        uri: route('admin.blog.index')
      },
      {
        permission: 'blog-category',
        text: 'Category',
        uri: route('admin.category.index')
      },
      {
        permission: 'blog-tags',
        text: 'Tags',
        uri: route('admin.tag.index')
      }
    ]
  },
  {
    type: menuType.dropdown,
    icon: 'columns',
    text: 'Faq',
    subs: [
      {
        permission: 'faq',
        text: "Faq's",
        uri: route('admin.faq.index')
      },
      {
        permission: 'faq-category',
        text: 'Category',
        uri: route('admin.faq-category.index')
      }
    ]
  },
  {
    permission: 'features',
    icon: 'activity',
    text: 'Steps',
    uri: route('admin.features.index')
  },
  {
    permission: 'testimonials',
    icon: 'calendar',
    text: 'Testimonials',
    uri: route('admin.testimonials.index')
  },
  {
    permission: 'about',
    icon: 'activity',
    text: 'About Us',
    uri: route('admin.about.index')
  },
  {
    permission: 'partners',
    icon: 'users',
    text: 'Partners',
    uri: route('admin.partner.index')
  },
  {
    permission: 'currency',
    icon: 'dollar-sign',
    text: 'Currency',
    uri: route('admin.currency.index')
  },
  {
    permission: 'language',
    icon: 'grid',
    text: 'Language',
    uri: route('admin.language.index')
  },
  {
    permission: 'locations',
    icon: 'map-pin',
    text: 'Location',
    uri: route('admin.countries.index')
  },
  {
    permission: 'menu',
    icon: 'menu',
    text: 'Menu',
    uri: route('admin.menu.index')
  },
  {
    permission: 'custom-page',
    icon: 'box',
    text: 'Custom Pages',
    uri: route('admin.page.index')
  },
  {
    permission: 'seo',
    icon: 'tool',
    text: 'Seo Settings',
    uri: route('admin.seo.index')
  },
  

  {
    type: menuType.heading,
    text: 'SITE SETTINGS'
  },

  {
    permission: 'kyc-methods',
    type: menuType.dropdown,
    disable: false, // here we need to get env variable status
    icon: 'file-text',
    text: 'KYC',
    subs: [
      {
        permission: 'kyc-methods',
        text: 'Create Method',
        uri: route('admin.kyc-methods.create')
      },
      {
        permission: 'kyc-methods',
        text: 'All Methods',
        uri: route('admin.kyc-methods.index')
      },
      {
        permission: 'kyc-requests',
        text: 'KYC Requests',
        uri: route('admin.kyc-requests.index')
      }
    ]
  },

  {
    permission: 'page-settings',
    icon: 'sliders',
    text: 'Page Settings',
    uri: route('admin.page-settings.index')
  },
  {
    permission: 'theme-setting',
    icon: 'layers',
    text: 'Themes',
    uri: route('admin.themes')
  },
  {
    type: menuType.dropdown,
    icon: 'lock',
    text: 'Admin and Role',
    subs: [
      {
        permission: 'admin',
        text: 'Admin',
        uri: route('admin.admin.index')
      },
      {
        permission: 'roles',
        text: 'Roles',
        uri: route('admin.role.index')
      }
    ]
  },
  {
    permission: 'developer-settings',
    type: menuType.dropdown,
    icon: 'settings',
    text: 'Developer Settings',
    subs: [
      {
        text: 'App Setting',
        uri: route('admin.developer-settings.show', 'app-settings')
      },
      {
        text: 'SMTP Setting',
        uri: route('admin.developer-settings.show', 'mail-settings')
      },
      {
        text: 'Storage Setting',
        uri: route('admin.developer-settings.show', 'storage-settings')
      },
      {
        text: 'OpenAi Setting',
        uri: route('admin.developer-settings.show', 'open-ai-settings')
      },
      {
        text: 'Verification Setting',
        uri: route('admin.developer-settings.show', 'verification-settings')
      },
      {
        text: 'Newsletter Setting',
        uri: route('admin.developer-settings.show', 'newsletter-settings')
      },
      {
        text: 'Social Login Setting',
        uri: route('admin.developer-settings.show', 'social-login-settings')
      },
      {
        text: 'App Update',
        uri: route('admin.update.index')
      }
    ]
  },

  {
    type: menuType.heading,
    text: 'MY SETTINGS'
  },
  {
    icon: 'user',
    text: 'Profile Settings',
    uri: route('admin.profile.setting')
  }
]

export const updateActiveMenu = (uri) => {
  navMenuItems = navMenuItems.map((item) => {
    if (item.type != menuType.heading) {
      item.is_active = uri == item.uri
      if (item.subs?.length) {
        item.subs = item.subs.map((sub) => {
          if (uri === sub.uri) {
            sub.is_active = true
            item.is_active = true
          } else {
            sub.is_active = false
          }
          return sub
        })
      }
    }
    return item
  })
}

export const updateActiveSubMenu = (parentMenuKey, subMenuUri) => {
  navMenuItems = navMenuItems.map((item, key) => {
    item.is_active = key == parentMenuKey

    if (subMenuUri && item.subs?.length) {
      item.subs = item.subs.map((subItem) => {
        subItem.is_active = subItem.uri == subMenuUri
        return subItem
      })
    }
    return item
  })
}
