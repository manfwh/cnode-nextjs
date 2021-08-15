import cn from 'classnames'
import { forwardRef } from 'react'
import s from './Button.module.css'
import LoadingDots from '@/components/ui/LoadingDots'
const Button = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    size = 'default',
    style = {},
    Component = 'button',
    ...rest
  } = props
  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === 'ghost',
      [s.slim]: variant === 'slim',
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.large]: size === 'large'
    },
    className
  )
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={buttonRef}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <i className="m-0 flex">
          <LoadingDots />
        </i>
      ) : children}
    </Component>
  )
})

Button.propTypes = {

}

export default Button