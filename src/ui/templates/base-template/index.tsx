import React from 'react'
import { Location } from '@reach/router'
import { Header } from '../../organisms/header'
import { Footer } from '../../molecules/footer'
import classes from './style.module.less'

interface IProps {
  children?: React.ReactNode
}

/** Component: contains basic layout
 * @see Header
 * @see Footer
 */
export const BaseTemplate = ({ children }: IProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <Header />
      </div>

      {children
        ? (
          <Location>
            {({ location }) => (
              <div
                className={classes.children}
                key={location.key}
              >
                {children}
              </div>
            )}
          </Location>
        )
        : (
          <>
            No children passed
          </>
        )}

      <div>
        <Footer />
      </div>
    </div>
  )
}
