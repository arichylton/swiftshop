import { removeProduct } from '../../utils/firebase.utils';

const AdminDeleteModal = ({ modalId }) => {
  return (
    <div className='edit-button'>
      <p>
        <a
          className='btn btn-primary'
          data-bs-toggle='collapse'
          href='#collapseExample'
          role='button'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          Link with href
        </a>
      </p>
      <div className='collapse' id='collapseExample'>
        <div className='card card-body'>
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
    </div>
  );
};
export default AdminDeleteModal;