import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { navigate, Location } from '@reach/router'
import { Menu } from 'antd'
import { MenuItemProps } from 'antd/lib/menu'
import { HomeOutlined, ProfileOutlined, CheckSquareOutlined, SettingOutlined } from '@ant-design/icons'
import { RoutesService } from 'services'
import classes from './style.module.less'

interface IMenuItem {
  intlKey: string
  icon: React.ReactNode
  route: string
}

const menuItems: IMenuItem[] = [
  {
    intlKey: 'menu.index',
    icon: <HomeOutlined />,
    route: RoutesService.getIndex()
  },
  {
    intlKey: 'menu.skills',
    icon: <ProfileOutlined />,
    route: RoutesService.getSkills()
  },
  {
    intlKey: 'menu.todos',
    icon: <CheckSquareOutlined />,
    route: RoutesService.getTodos()
  },
  {
    intlKey: 'menu.settings',
    icon: <SettingOutlined />,
    route: RoutesService.getSettings()
  }
]

export const NavigationBar = () => {
  const onMenuItemClick = useCallback<NonNullable<MenuItemProps['onClick']>>((param) => {
    if (window.location.pathname !== param.key && typeof param.key === 'string') {
      navigate(param.key)
    }
  }, [])

  return (
    <Location>
      {({ location }) => (
        <Menu
          className={classes.menu}
          mode='horizontal'
          selectedKeys={[location.pathname]}
        >
          {menuItems.map(({ icon, intlKey, route }) =>
            <Menu.Item
              className={classes.menuItem}
              key={route}
              onClick={onMenuItemClick}
            >
              {icon}
              <FormattedMessage id={intlKey} />
            </Menu.Item>
          )}
        </Menu>
      )}
    </Location>
  )
}
