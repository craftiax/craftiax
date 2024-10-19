import { useState } from "react";

const TipArtistModal = ({ artist, onClose }) => {
  const [tipAmount, setTipAmount] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the tip submission logic here
    console.log(
      `Tip of ${tipAmount} submitted for ${artist.name} with comment: ${comment}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Tip Artist: {artist.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="tipAmount" className="block mb-2">
              Tip Amount:
            </label>
            <input
              type="number"
              id="tipAmount"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Submit Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TipArtistModal;
