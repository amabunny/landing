import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { navigate, Location } from '@reach/router'
import { Icon, Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import classes from './style.module.less'

interface IMenuItem {
  intlKey: string
  icon: string
  route: string
}

const menuItems: IMenuItem[] = [
  {
    intlKey: 'menu.index',
    icon: 'home',
    route: '/'
  },
  {
    intlKey: 'menu.todos',
    icon: 'check-square',
    route: '/todos'
  },
  {
    intlKey: 'menu.sequences',
    icon: 'ordered-list',
    route: '/sequences'
  },
  {
    intlKey: 'menu.skills',
    icon: 'profile',
    route: '/skills'
  },
  {
    intlKey: 'menu.settings',
    icon: 'setting',
    route: '/settings'
  }
]

export const NavigationBar = () => {
  const onMenuItemClick = useCallback((param: ClickParam) => {
    navigate(param.key)
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
              <Icon type={icon} />
              <FormattedMessage id={intlKey} />
            </Menu.Item>
          )}
        </Menu>
      )}
    </Location>
  )
}
