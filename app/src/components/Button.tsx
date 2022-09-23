import styled from 'styled-components'

interface ButtonProps {
  size: 'md' | 'lg'
  variant: 'danger' | 'primary'
}

export const Button = styled.button<ButtonProps>`
  color: ${(props) => props.theme.text};
  border: none;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.variant === 'danger') {
      return props.theme.danger
    }
    return props.theme.primary
  }};
`
