import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Form, Input, DatePicker, Button } from 'antd'
import moment from 'moment'
import { addTodo } from '../../model'
import { ITodo } from '../../types'

interface IProps {
  className?: string
}

const TEXTAREA_ROWS = 6

const initialFormState: ITodo = {
  text: ''
}

export const TodoAddForm: React.FC<IProps> = ({ className }) => {
  const [form, setFormValue] = useState<ITodo>(initialFormState)

  return (
    <Form
      className={className}
      onSubmit={() => {
        addTodo(form)
        setFormValue(initialFormState)
      }}
    >
      <Form.Item label={<FormattedMessage id='todos.form.text' />}>
        <Input.TextArea
          onChange={({ target }) => setFormValue(form => ({ ...form, text: target.value }))}
          rows={TEXTAREA_ROWS}
          value={form.text}
        />
      </Form.Item>

      <Form.Item label={<FormattedMessage id='todos.form.deadline' />}>
        <DatePicker
          onChange={value => value ? setFormValue(form => ({ ...form, deadline: value })) : undefined}
          showTime
          value={form.deadline || moment(form.deadline)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType='submit'
          type='primary'
        >
          <FormattedMessage id='todos.form.submit' />
        </Button>
      </Form.Item>
    </Form>
  )
}
