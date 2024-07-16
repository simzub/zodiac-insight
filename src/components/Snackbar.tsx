import { Transition } from 'react-transition-group';
import { Snackbar } from '@mui/base/Snackbar';
import { useRef, useState } from 'react';
import './snackbar.css';
import { IoClose } from 'react-icons/io5';

interface BottomSnackbarProps {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
}

export default function BottomSnackbar({
  isOpen,
  handleOpen,
}: BottomSnackbarProps) {
  const [exited, setExited] = useState(true);
  const nodeRef = useRef(null);

  const handleClose = (_: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    handleOpen(false);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <>
      <Snackbar
        autoHideDuration={5000}
        open={isOpen}
        onClose={handleClose}
        exited={exited}
        className="snackbar"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={isOpen}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="snackbar-content"
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <div className="snackbar-message">
                <p className="snackbar-title">Thanks for subscribing!</p>
                <p className="snackbar-description">
                  Your daily horoscope is on its way!
                </p>
              </div>
              <IoClose
                onClick={handleClose as React.MouseEventHandler<SVGElement>}
                className="snackbar-close-icon"
                role="close"
              />
            </div>
          )}
        </Transition>
      </Snackbar>
    </>
  );
}

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};
