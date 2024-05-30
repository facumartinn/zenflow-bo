import { HomeSvg, OrdersSvg, UsersSvg, ConfigurationSvg } from '../svg/sidebarSvg'

interface SideBarButtonProps {
  top: Array<
  {
    icon: any
    text: string
    link: string
    action?: () => void
  }>
  bottom: Array<
  {
    icon: any
    text: string
    link?: string
    action?: () => void
  }>
}

export const sideBarButtons: SideBarButtonProps = {
  top: [
    {
      icon: <HomeSvg color='black' />,
      text: 'Inicio',
      link: '/'
    },
    {
      icon: <OrdersSvg color='black' />,
      text: 'Pedidos',
      link: '/orders'
    },
    {
      icon: <UsersSvg color='black' />,
      text: 'Usuarios',
      link: '/users'
    }
  ],
  bottom: [
    {
      icon: <ConfigurationSvg color='black' />,
      text: 'Configuración',
      link: '/config'
    }
  ]
}
