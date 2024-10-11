import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";


describe("ModalPage", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test("Modal이 잘 렌더링 되었는지 test", () => {
    const handleClose = jest.fn();

    render(
      <Modal isOpen onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    );

    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(spy).not.toHaveBeenCalled();
  });

  test("esc를 눌렀을 때 모달이 닫히는지 test", async () => {
    const handleClose = jest.fn();

    render(
      <Modal isOpen onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    fireEvent.keyDown(modal , {key: "Escape", code:"Escape"});
    
    waitForElementToBeRemoved(modal).then(() => {
      expect(modal).not.toBeInTheDocument();
      expect(handleClose).toHaveBeenCalled();
    })
    // test
  })
  
})