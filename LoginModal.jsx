import { useAuth0 } from "@auth0/auth0-react";
import { X } from "lucide-react";

const LoginModal = ({ onClose }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Sign in with Google or Social Account
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
