import trans from '@/Composables/transComposable'
import SimpleBar from 'simplebar'

const searchData = [
    {
        title: 'General',
        pages: [
            {
                icon: 'bx bx-home',
                name: trans('Dashboard'),
                url: route('admin.dashboard')
            },
            {
                icon: 'bx bx-cart',
                name: trans('Orders'),
                url: route('admin.order.index')
            },
            {
                icon: 'bx bx-user',
                name: trans('Subscriptions'),
                url: route('admin.plan.index')
            },

            {
                icon: 'bx bx-calendar',
                name: trans('Payment Gateways'),
                url: route('admin.gateways.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Cron Jobs'),
                uri: '/admin/cron-job'
            },
            {
                icon: 'bx bx-phone',
                name: trans('Help & Support'),
                url: route('admin.support.index')
            },
            {
                icon: 'bx bx-grid',
                name: trans('Faq'),
                url: route('admin.faq.index')
            },
            {
                icon: 'bx bx-list-ul',
                name: trans('Features'),
                url: route('admin.features.index')
            },
            {
                icon: 'bx bx-calendar',
                name: trans('Testimonials'),
                url: route('admin.testimonials.index')
            },
            {
                icon: 'bx bx-user',
                name: trans('Team'),
                url: route('admin.team.index')
            },
            {
                icon: 'bx bx-calendar',
                name: trans('About Us'),
                url: route('admin.about.index')
            },
            {
                icon: 'bx bx-user',
                name: trans('Partners'),
                url: route('admin.partner.index')
            },
            {
                icon: 'bx bx-grid',
                name: trans('Language'),
                url: route('admin.language.index')
            },
            {
                icon: 'bx bx-pin',
                name: trans('Location'),
                url: route('admin.countries.index')
            },
            {
                icon: 'bx bx-list-ol',
                name: trans('Menu'),
                url: route('admin.menu.index')
            },
            {
                icon: 'bx bx-award',
                name: trans('Qualificatoins'),
                url: route('admin.qualifications.index')
            },
            {
                icon: 'bx bx-list-ul',
                name: trans('Expert Level'),
                url: route('admin.expert-levels.index')
            },
            {
                icon: 'bx bx-box',
                name: trans('Custom Pages'),
                url: route('admin.page.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Seo Settings'),
                url: route('admin.seo.index')
            },
            {
                icon: 'bx bx-chevron-right',
                name: trans('Jobs'),
                url: route('admin.job.index')
            },
            {
                icon: 'bx bx-box',
                name: trans('Service'),
                url: route('admin.job-service.index')
            },
            {
                icon: 'bx bx-box',
                name: trans('Category'),
                url: route('admin.job-category.index')
            },
            {
                icon: 'bx bx-box',
                name: trans('Tags'),
                url: route('admin.job-tag.index')
            },
            {
                icon: 'bx bx-bell',
                name: trans('Notifications'),
                url: route('admin.notification.index')
            },
            {
                icon: 'bx bx-chevron-right',
                name: trans('Blog'),
                url: route('admin.blog.index')
            },
            {
                icon: 'bx bx-chevron-right',
                name: trans('Category'),
                url: route('admin.category.index')
            },
            {
                icon: 'bx bx-chevron-right',
                name: trans('Tags'),
                url: route('admin.tag.index')
            }
        ]
    },
    {
        title: 'Peoples',
        pages: [
            {
                icon: 'bx bx-user',
                name: trans('Customers'),
                url: route('admin.customer.index')
            },
            {
                icon: 'bx bx-user',
                name: trans('Companies'),
                url: route('admin.companies.index')
            },
            {
                icon: 'bx bx-user',
                name: trans('Candidates'),
                url: route('admin.candidates.index')
            }
        ]
    },
    {
        title: 'Settings',
        pages: [
            {
                icon: 'bx bx-cog',
                name: trans('Create KYC Method'),
                url: route('admin.kyc-methods.create')
            },
            {
                icon: 'bx bx-cog',
                name: trans('KYC Methods'),
                url: route('admin.kyc-methods.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('KYC Requests'),
                url: route('admin.kyc-requests.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Page Settings'),
                url: route('admin.page-settings.index')
            },

            {
                icon: 'bx bx-cog',
                name: trans('Admin'),
                url: route('admin.admin.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Roles'),
                url: route('admin.role.index')
            },
            {
                icon: 'bx bx-cog',
                name: trans('App Setting'),
                url: route('admin.developer-settings.show', 'app-settings')
            },
            {
                icon: 'bx bx-cog',
                name: trans('SMTP Setting'),
                url: route('admin.developer-settings.show', 'mail-settings')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Storage Setting'),
                url: route('admin.developer-settings.show', 'storage-settings')
            },
            {
                icon: 'bx bx-cog',
                name: trans('Profile Settings'),
                url: route('admin.profile.setting')
            }
        ]
    }
]

const recentSearchData = searchData.slice(0, 10)

export class SearchModal {
    constructor (trigger, target) {
        this.setTrigger(trigger)
        this.setTarget(target)
        this.setModal()
        this.setSearchInput()

        this.registerEvents()
        this.renderSearchContent(recentSearchData)
    }

    // Set the trigger element
    setTrigger (trigger) {
        if (typeof trigger === 'string') {
            this.trigger = document.querySelector(trigger)
        }

        if (trigger instanceof HTMLElement) {
            this.trigger = trigger
        }

        if (!this.trigger) {
            throw new Error('No trigger element found')
        }
    }

    // Set the target element
    setTarget (target) {
        if (typeof target === 'string') {
            this.target = document.querySelector(target)
        }

        if (target instanceof HTMLElement) {
            this.target = target
        }

        if (!this.target) {
            throw new Error('No target element found')
        }
    }

    // Set the modal
    setModal () {
        this.modal = createModal(this.target)
    }

    // Set the search input
    setSearchInput () {
        const searchInput = this.target.querySelector('input[type="text"]')
        if (!searchInput) {
            throw new Error('No search input found')
        }
        this.searchInput = searchInput
    }

    // Show the modal
    show () {
        this.modal.show()
    }

    // Hide the modal
    hide () {
        this.modal.hide()
    }

    // Register events
    registerEvents () {
        // Handle trigger click
        this.trigger.addEventListener('click', () => {
            this.searchInput.value = ''
            this.show()
            this.renderSearchContent(recentSearchData)
        })

        // Handle input change
        this.searchInput.addEventListener('input', e =>
            this.handleInput(e.target.value)
        )
    }

    // Handle input change
    handleInput (search) {
        if (search.length === 0) {
            this.renderSearchContent(recentSearchData)
            return
        }

        const data = searchData
            .map(item => {
                return {
                    ...item,
                    // Search the pages array for pages that start with the search string
                    pages: item.pages.filter(page =>
                        page.name.toLowerCase().startsWith(search.toLowerCase())
                    )
                }
            })
            // Filter out items that have no pages
            .filter(item => item.pages.length > 0)

        if (data.length === 0) {
            this.renderEmptyContent(search)
            return
        }

        // Render search content
        // this.renderSearchContent(data)
    }

    // Render the modal content
    renderSearchContent (data) {
        const modalBody = this.target.querySelector('.modal-body')
        const html = data.map(item => this.renderSection(item)).join('')

        // Set the innerHTML of the modal body to the html
        modalBody.innerHTML = `
      <div class="space-y-4 -mt-[12px]">
        ${html}
      </div>
    `

        new SimpleBar(modalBody)
    }

    // Render a single item
    renderSection (item) {
        return `
      <div class="">
        <h6>${item.title}</h6>
        <ul class="space-y-2 mt-2">
          ${item.pages.map(page => this.renderItem(page)).join('')}
        </ul>
      </div>
    `
    }

    // Render a single item
    renderItem (page) {
        return `
      <li class="">
        <a href="${page.url}" class="flex rounded-primary px-4 py-2 text-sm items-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm">
          <i class="${page.icon} text-slate-500 dark:text-slate-400 text-lg"></i>
          <span>${page.name}</span>
          <i class="ti ti-chevron-right text-slate-500 ml-auto"></i>
        </a>
      </li>
    `
    }

    // Render empty state
    renderEmptyContent (search = '') {
        const modalBody = this.target.querySelector('.modal-body')
        modalBody.innerHTML = `
    <div class="h-20 flex items-center justify-center">
      <p class="text-slate-400">
        No results for <span class="text-slate-600 dark:text-slate-300">'${search}'</span>
      </p>
    </div>
    `
    }
}

const searchModal = {
    init () {
        const triggers = document.querySelectorAll(
            '[data-trigger="search-modal"]'
        )
        const target = document.getElementById('search-modal')

        triggers.forEach(trigger => {
            new SearchModal(trigger, target)
        })
    }
}

export default searchModal
