import Button from "./Button";
import Modal from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
  title = "Confirmation",
  description = "Êtes-vous sûr de vouloir continuer ?",
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            Confirmer
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </Modal>
  );
}