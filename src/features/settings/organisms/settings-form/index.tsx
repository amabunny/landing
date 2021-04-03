import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { Select, Form, Typography, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import { useStore } from 'effector-react'
import { combine } from 'effector'
import { AvailableLocales } from 'types'
import { changeLanguage, $language } from 'shared-features/intl'
import classes from './style.module.less'

const $formData = combine({ $language })

export const SettingsForm = () => {
  const { $language } = useStore($formData)
  const [$formLanguage, setFormLanguage] = useState($language)
  const [dataChanged, setDataChanged] = useState(false)

  const formItemLayout = useMemo(() => ({
    labelCol: {
      xs: { span: 2 }
    },
    wrapperCol: {
      xs: { span: 5 }
    }
  }), [])

  const onFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      $formLanguage !== $language &&
      $formLanguage !== null
    ) {
      changeLanguage($formLanguage)
    }
  }, [$formLanguage, $language])

  const onLanguageSelect = useCallback((value: AvailableLocales | null) => {
    setFormLanguage(value)
  }, [])

  useEffect(() => {
    return () => {
      setDataChanged(true)
    }
  }, [$formLanguage])

  return (
    <>
      <Typography.Title>
        <FormattedMessage id='settings.title' />
      </Typography.Title>

      <Form
        {...formItemLayout}
        className={classes.form}
        onSubmitCapture={onFormSubmit}
      >
        <Form.Item label={<FormattedMessage id='language' />}>
          <Select
            className={classes.languageSelect}
            onSelect={onLanguageSelect}
            value={$formLanguage || undefined}
          >
            {Object.values(AvailableLocales).map(locale =>
              <Select.Option
                key={locale}
                value={locale}
              >
                <FormattedMessage id={`locales.${locale}`} />
              </Select.Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={!dataChanged}
            htmlType='submit'
            type='primary'
          >
            <FormattedMessage id='settings.submit' />
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
