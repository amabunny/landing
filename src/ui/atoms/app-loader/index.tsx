import React from 'react'
import { Spin, Icon } from 'antd'
import classes from './style.module.less'

export const AppLoader = () => {
  return (
    <div className={classes.loader}>
      <Spin
        indicator={(
          <Icon
            spin
            style={{ fontSize: 55 }}
            type='sync'
          />
        )}
        style={{ fontSize: 35 }}
        tip={"It's nearby..."}
      />
    </div>
  )
}
