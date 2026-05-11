function AlgorithmInfoModal({ id, title, description, details = [] }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-2xl rounded-2xl">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm text-base-content/80">{description}</p>
        <div className="mt-4 space-y-2 text-sm">
          {details.map((item) => (
            <p key={item} className="rounded-xl bg-base-200/70 p-3">
              {item}
            </p>
          ))}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary btn-sm">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AlgorithmInfoModal;
