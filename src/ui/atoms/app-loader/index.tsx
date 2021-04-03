import React from 'react'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import classes from './style.module.less'

export const AppLoader = () => {
  return (
    <div className={classes.loader}>
      <Spin
        indicator={(
          <SyncOutlined
            spin
            style={{ fontSize: 55 }}
          />
        )}
        style={{ fontSize: 35 }}
        tip={"It's nearby..."}
      />
    </div>
  )
}
