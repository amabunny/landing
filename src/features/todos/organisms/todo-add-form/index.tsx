import React, { useMemo, useState, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { Form, Input, DatePicker, Button } from 'antd'
import moment, { Moment } from 'moment'
import { addTodo } from '../../model'
import { ITodo } from 'types/todos'

interface IProps {
  className?: string
}

const TEXTAREA_ROWS = 6

const initialFormState: Omit<ITodo, 'created'> = {
  text: ''
}

export const TodoAddForm: React.FC<IProps> = ({ className }) => {
  const [form, setFormValue] = useState(initialFormState)

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addTodo({
      ...form,
      created: new Date().getTime()
    })

    setFormValue(initialFormState)
  }, [form])

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value

    setFormValue(form => ({
      ...form,
      text
    }))
  }, [])

  const onDeadlineChange = useCallback((deadline: Moment | null) => {
    setFormValue(form => ({
      ...form,
      deadline: deadline?.unix() || undefined
    }))
  }, [])

  const deadlineDateValue = useMemo(() => (
    form.deadline
      ? moment(form.deadline)
      : undefined
  ), [form.deadline])

  return (
    <Form
      className={className}
      onSubmitCapture={onFormSubmit}
    >
      <Form.Item label={<FormattedMessage id='todos.form.text' />}>
        <Input.TextArea
          onChange={onTextChange}
          rows={TEXTAREA_ROWS}
          value={form.text}
        />
      </Form.Item>

      <Form.Item label={<FormattedMessage id='todos.form.deadline' />}>
        <DatePicker
          onChange={onDeadlineChange}
          showTime
          value={deadlineDateValue}
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
