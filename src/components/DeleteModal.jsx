import Modal from "react-modal";
import { styled } from "styled-components";
import { deletePost } from "../services/Api";

export default function DeleteModal({
  isOpen,
  setModalIsOpen,
  idPost,
  userToken,
  updatePostList,
}) {
  async function handleDeletePost() {
    deletePost(idPost, userToken)
      .then(({ data }) => {
        updatePostList((prevState) =>
          prevState.filter((post) => post.id !== idPost)
        );
        setModalIsOpen(false);
      })
      .catch((error) => {
        alert("Unable to delete this post");
        console.log(error);
      });
  }

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles} className="Modal">
        <h1>Are you sure you want to delete this post?</h1>

        <SCButtonGroup>
          <SCNoButton onClick={() => setModalIsOpen(false)} data-test="cancel">
            No, go back
          </SCNoButton>
          <SCYesButton onClick={() => handleDeletePost()} data-test="confirm">
            Yes, delete it
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
