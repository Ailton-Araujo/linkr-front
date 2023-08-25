import Modal from "react-modal";
import { styled } from "styled-components";
import { repostPost } from "../services/Api";

export default function RepostModal({
  isOpen,
  setModalIsOpen,
  idPost,
  userToken,
  post
}) {
  async function handleRepostPost() {
    repostPost(idPost, userToken)
      .then(({ data }) => {
        setModalIsOpen(false);
        post.repostCount++;
      })
      .catch((error) => {
        alert("Unable to reposted this post");
        setModalIsOpen(false);
        console.log(error);
      });
  }

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles} className="Modal">
        <h1>Do you want to re-post this link?</h1>

        <SCButtonGroup>
          <SCNoButton onClick={() => setModalIsOpen(false)} data-test="cancel">
            No, cancel
          </SCNoButton>
          <SCYesButton onClick={() => handleRepostPost()} data-test="confirm">
            Yes, share!
          </SCYesButton>
        </SCButtonGroup>
      </Modal>
    </>
  );
}

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "absolute",
    border: "none",
    background: "#333",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "20px",
    maxWidth: "597px",
    maxHeight: "262px",
    margin: "auto",
    outline: "none",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato",
    fontSize: "34px",
    fontWeight: "700",
  },
};

const SCButtonGroup = styled.div`
  display: flex;
  gap: 27px;
  margin-top: 47px;

  > button {
    border-radius: 5px;
    border: none;
    width: 134px;
    height: 37px;
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
  }
`;

const SCNoButton = styled.button`
  color: #1877f2;
`;

const SCYesButton = styled.button`
  background: #1877f2;
  color: #fff;
`;
