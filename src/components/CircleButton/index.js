import styled from 'styled-components';

const CircleButton = styled.button.attrs(props => ({
  type: props.type,
  disabled: props.disabled,
  onClick: props.action,
}))`
  border: 0;
  background: #7159c1;
  padding: 15px;
  color: #fff;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.7;

    svg {
      rotate: 45deg;
    }
  }
`;

export default CircleButton;
