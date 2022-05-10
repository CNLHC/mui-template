import { icon, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core"

const MenuData: MenuEntry[] = [
    {
        route: [],
        name: "岗位管理",
        key: "menu1",
        icon: ["fas", "clipboard"]
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