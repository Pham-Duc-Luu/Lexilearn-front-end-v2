import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { useAppSelector } from '@/redux/store/hooks';
import { useDispatch } from 'react-redux';
import { handleClose } from '@/redux/store/modalSlice';

export default function DevelopmentProccessAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const backdrops = ['opaque', 'blur', 'transparent'];

  const model = useAppSelector((state) => state.persistedReducer.model);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        backdrop={model.backdrops}
        isOpen={model.isOpen}
        onClose={() => {
          dispatch(handleClose());
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {model.moderHeader}
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
