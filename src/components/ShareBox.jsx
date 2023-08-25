import { TbRepeat } from "react-icons/tb";
import { styled } from "styled-components";

export default function ShareBox({ setModalIsOpen, repostCount }) {
  return (
    <SCContent>
      <strong
        type="button"
        onClick={() => setModalIsOpen(true)}
        data-test="repost-btn"
      >
        <SCShareIcon />
      </strong>
      <span data-test="repost-counter">{repostCount} re-posts</span>
    </SCContent>
  );
}

const SCContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    color: #fff;
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
  }
`;

const SCShareIcon = styled(TbRepeat)`
  width: 25px;
  height: 25px;
  color: #fff;
  cursor: pointer;
`;
