import { icon, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core"

const MenuData: MenuEntry[] = [
    {
        route: [],
        name: "菜单1",
        key: "menu1",
        icon: ["fas", "clipboard"]

    },
    {
        route: [],
        name: "菜单2",
        key: "menu2",
        children: [
            {
                route: [],
                name: "子菜单1",
                key: "submenu1"
            },

            {
                route: [],
                name: "子菜单2",
                key: "submenu2",
                children: [

                    {
                        route: [],
                        name: "孙菜单1",
                        key: "grandsubmenu1"
                    },

                ]

            },
        ]
    },

    {
        route: [],
        name: "菜单3",
        key: "menu3"
    },
]
export type MenuEntry = {
    route: string[]
    name: string
    key: string
    icon?: [IconPrefix, IconName]
    children?: MenuEntry[]

}
export default MenuData