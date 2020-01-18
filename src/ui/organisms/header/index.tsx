import React from 'react'
import { Avatar, Col, Row } from 'antd'
import { SergeiModel } from 'models/sergei'
import { Container } from '../../atoms/container'
import { NavigationBar } from '../../molecules/menu'
import classes from './style.module.less'

export const Header = () => {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <div>
          <Row
            align='middle'
            gutter={8}
            type='flex'
          >
            <Col>
              <Avatar src={SergeiModel.avatarUrl} />
            </Col>

            <Col>
              {SergeiModel.nickname}
            </Col>
          </Row>
        </div>

        <div>
          <NavigationBar />
        </div>
      </Container>
    </div>
  )
}
