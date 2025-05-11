import "animate.css";

function Warning({ id, message, removeError }) {
  return (
    <div
      key={id}
      onClick={() => removeError(id)}
      className="h-20 w-72 border-l-8 border-yellow-400 bg-yellow-50 px-4 py-2 shadow-lg rounded hover:shadow-xl cursor-pointer animate__animated animate__slideInRight"
    >
      <span className="font-semibold">{message}</span>
    </div>
  );
}

export default Warning;
